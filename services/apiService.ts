
import { User, DashboardStats, Sale, Product } from '../types';
import { supabase } from '../lib/supabase';

class ApiService {
  /**
   * Maps a Supabase user object to the internal KHAMRAH User interface.
   * Leverages user_metadata for full name and roles.
   */
  private mapSupabaseUser(sbUser: any): User {
    const isAdminEmail = sbUser.email === import.meta.env.VITE_ADMIN_EMAIL;
    return {
      id: sbUser.id,
      email: sbUser.email || '',
      fullName: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'Member',
      role: isAdminEmail ? 'owner' : ((sbUser.user_metadata?.role as any) || 'customer'),
      avatarUrl: sbUser.user_metadata?.avatar_url,
    };
  }

  // --- Core Authentication ---

  async login(credentials: { email: string; pass: string }): Promise<{ token: string; user: User }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.pass,
    });

    if (error) throw error;
    if (!data.user || !data.session) throw new Error('Authentication failed');

    // Fetch from public.users table
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return {
      token: data.session.access_token,
      user: userData ? {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name,
        role: userData.email === import.meta.env.VITE_ADMIN_EMAIL ? 'owner' : userData.role,
        avatarUrl: userData.avatar_url,
      } : this.mapSupabaseUser(data.user),
    };
  }

  async register(data: { email: string; password: string; fullName: string }): Promise<any> {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: data.fullName,
          role: 'customer'
        }
      }
    });

    if (error) throw error;
    return authData;
  }

  async loginWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      }
    });

    if (error) throw error;
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Cleanup local state
    localStorage.removeItem('khamrah_token');
    localStorage.removeItem('khamrah_user');
  }

  /**
   * Retrieves the current authenticated user session.
   * Used on app refresh to maintain identity.
   */
  async getCurrentSessionUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    // Fetch user data from public.users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      // Fallback to metadata if table query fails
      return this.mapSupabaseUser(user);
    }

    // Force Admin/Owner role for the hardcoded admin email
    const isAdminEmail = userData.email === import.meta.env.VITE_ADMIN_EMAIL;

    // AUTO-ELEVATION: If this is the admin email but DB says otherwise, upgrade them now
    if (isAdminEmail && userData.role !== 'owner') {
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: 'owner' })
        .eq('id', userData.id);

      if (!updateError) {
        console.log("👑 Auto-elevated user to Owner role in database");
        userData.role = 'owner'; // Update local object
      }
    }

    return {
      id: userData.id,
      email: userData.email,
      fullName: userData.full_name,
      role: isAdminEmail ? 'owner' : userData.role,
      avatarUrl: userData.avatar_url,
    };
  }

  // --- Admin Dashboard (Simulated until specific tables are created) ---

  async getDashboardStats(): Promise<DashboardStats> {
    const fiveMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString(); // expanded window for more "activity"

    const [
      { count: orderCount },
      { count: userCount },
      { count: totalVisits },
      { data: lowStock },
      { count: activeNowCount },
      { data: recentSessions },
      { data: recentVisits }
    ] = await Promise.all([
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('site_visits').select('*', { count: 'exact', head: true }),
      supabase.from('product_variants').select('id').lt('stock_quantity', 10),
      supabase.from('analytics_sessions').select('*', { count: 'exact', head: true }).gt('last_seen', fiveMinutesAgo),
      supabase.from('analytics_sessions').select('page_path, duration').order('last_seen', { ascending: false }).limit(100),
      supabase.from('site_visits').select('visitor_info').order('visited_at', { ascending: false }).limit(200)
    ]);

    // Calculate revenue
    const { data: revenueData } = await supabase.from('payments').select('amount').eq('payment_status', 'succeeded');
    const totalRevenue = revenueData?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) || 0;

    // Avg Session Duration
    const durations = recentSessions?.map(d => d.duration) || [];
    const avgDuration = durations.length > 0
      ? durations.reduce((a, b) => a + (b || 0), 0) / durations.length
      : 0;

    // Top Pages
    const pageCounts: Record<string, number> = {};
    recentSessions?.forEach((s: any) => {
      const p = s.page_path || '/';
      pageCounts[p] = (pageCounts[p] || 0) + 1;
    });
    const topActivePages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Device Stats & Geo Stats (Simulated from Language)
    let mobile = 0, desktop = 0;
    const geoCounts: Record<string, number> = {};

    recentVisits?.forEach((v: any) => {
      // Device
      const ua = (v.visitor_info?.userAgent || '').toLowerCase();
      if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) mobile++;
      else desktop++;

      // Geo (Language Approximation)
      const lang = (v.visitor_info?.language || 'en-US').split('-')[1] || 'US';
      const countryMap: Record<string, string> = {
        'DE': 'Germany', 'AT': 'Austria', 'CH': 'Switzerland',
        'US': 'USA', 'GB': 'UK', 'FR': 'France', 'IT': 'Italy'
      };
      const country = countryMap[lang] || 'Other';
      geoCounts[country] = (geoCounts[country] || 0) + 1;
    });

    const totalGeo = Object.values(geoCounts).reduce((a, b) => a + b, 0) || 1;
    const geoStats = Object.entries(geoCounts)
      .map(([country, count]) => ({ country, percent: Math.round((count / totalGeo) * 100) }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 3);

    return {
      totalRevenue,
      totalOrders: orderCount || 0,
      activeUsers: totalVisits || userCount || 0,
      realTimeUsers: activeNowCount || 0,
      avgSessionDuration: Math.round(avgDuration),
      lowStockItems: lowStock?.length || 0,
      revenueTrend: '+12%',
      orderTrend: '+5%',
      topActivePages,
      deviceStats: { mobile, desktop },
      geoStats: geoStats.length > 0 ? geoStats : [{ country: 'Germany', percent: 100 }]
    };
  }

  async trackVisit(pagePath: string): Promise<void> {
    // Check session storage to avoid duplicate hits in one session
    const sessionKey = `vtrack_${pagePath.replace(/\//g, '_')}`;
    if (sessionStorage.getItem(sessionKey)) return;

    try {
      const sessionId = localStorage.getItem('vtrack_session') || crypto.randomUUID();
      localStorage.setItem('vtrack_session', sessionId);

      await supabase.from('site_visits').insert({
        session_id: sessionId,
        page_path: pagePath,
        visitor_info: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenSize: `${window.innerWidth}x${window.innerHeight}`
        }
      });

      sessionStorage.setItem(sessionKey, 'true');
    } catch (err) {
      console.warn('Silent fail: Visitor tracking failed.', err);
    }
  }

  async getSales(): Promise<Sale[]> {
    const { data, error } = await supabase.from('sales').select('*').order('created_at', { ascending: false });
    if (error) throw error;

    return data.map(s => ({
      id: s.id,
      name: s.name,
      discountType: s.discount_type as any,
      discountValue: s.discount_value,
      isActive: s.is_active,
      startDate: s.start_date,
      endDate: s.end_date,
      isPermanent: s.is_permanent,
      appliesTo: s.applies_to as any,
      targetIds: s.target_ids
    }));
  }

  // --- Ratings & Reviews ---

  async submitReview(productId: string, rating: number): Promise<void> {
    // 1. Always save locally (Guest or User)
    try {
      const saved = localStorage.getItem('local_reviews');
      const localReviews = saved ? JSON.parse(saved) : {};
      localReviews[productId] = rating;
      localStorage.setItem('local_reviews', JSON.stringify(localReviews));
    } catch (e) {
      console.warn("Local review save failed", e);
    }

    // 2. Try Supabase if logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; // Guest rating saved locally only

    const { error } = await supabase
      .from('reviews')
      .upsert({
        user_id: user.id,
        product_id: productId,
        rating: rating,
        created_at: new Date().toISOString()
      }, { onConflict: 'user_id,product_id' });

    if (error) {
      console.warn("Supabase review sync failed, but saved locally.", error);
      // We don't throw because local save succeeded
    }

    // 3. Recalculate Average (Best effort for logged in)
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId);

    if (reviews && reviews.length > 0) {
      const total = reviews.reduce((sum, r) => sum + r.rating, 0);
      // const avg = total / reviews.length;
      // console.log("New Average Rating:", parseFloat(avg.toFixed(1)));
    }
  }

  async getUserReview(productId: string): Promise<number | null> {
    // 1. Check Local Storage first
    try {
      const saved = localStorage.getItem('local_reviews');
      if (saved) {
        const localReviews = JSON.parse(saved);
        if (localReviews[productId]) return localReviews[productId];
      }
    } catch (e) { }

    // 2. Check Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .maybeSingle();

    if (error) console.warn("Error fetching user review:", error);
    return data ? data.rating : null;
  }

  // --- Product Management (Admin) ---

  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      brand: p.brand,
      category: p.category_id,
      fragranceType: p.fragrance_type,
      gender: p.gender,
      images: p.images?.map((img: any) => img.image_url) || [],
      variants: p.variants?.map((v: any) => ({
        id: v.id,
        size: v.size,
        price: v.price,
        stock: v.stock_quantity,
        sku: v.sku
      })) || [],
      isActive: p.is_active,
      isFeatured: p.is_featured,
      notes: p.fragrance_notes || { top: [], middle: [], base: [] },
      rating: p.rating || 5,
      reviewCount: p.review_count || 0,
      salesCount: p.sales_count || 0,
      deliveryTime: p.delivery_time || 'In 1-3 Tagen bei dir',
      seo: { title: p.name, description: p.description, keywords: [] },
      createdAt: p.created_at
    }));
  }

  async getPublicProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        images:product_images(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      brand: p.brand,
      category: p.category_id,
      fragranceType: p.fragrance_type,
      gender: p.gender,
      images: p.images?.map((img: any) => img.image_url) || [],
      variants: p.variants?.map((v: any) => ({
        id: v.id,
        size: v.size,
        price: v.price,
        stock: v.stock_quantity,
        sku: v.sku
      })) || [],
      isActive: p.is_active,
      isFeatured: p.is_featured,
      notes: p.fragrance_notes || { top: [], middle: [], base: [] },
      rating: p.rating || 5,
      reviewCount: p.review_count || 0,
      salesCount: p.sales_count || 0,
      deliveryTime: p.delivery_time || 'In 1-3 Tagen bei dir',
      seo: { title: p.name, description: p.description, keywords: [] },
      createdAt: p.created_at
    }));
  }

  async getCategories(): Promise<{ id: string; name: string }[]> {
    const { data, error } = await supabase.from('categories').select('id, name').eq('is_active', true);
    if (error) throw error;
    return data || [];
  }

  async deleteProduct(productId: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) throw error;
  }

  async toggleProductStatus(productId: string, isActive: boolean): Promise<void> {
    const { error } = await supabase.from('products').update({ is_active: isActive }).eq('id', productId);
    if (error) throw error;
  }

  async uploadImage(file: File): Promise<string> {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return publicUrl;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'slug'>): Promise<Product> {
    console.log("🛠️ createProduct called with:", product);

    // 1. Slug & Category Safety
    // Ensure slug is URL-safe and unique
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

    let categoryId = product.category;
    // If category is "undefined", "", or not a valid string, send NULL to DB to avoid "invalid input syntax for type uuid"
    if (!categoryId || typeof categoryId !== 'string' || categoryId.trim() === '') {
      categoryId = null as any;
    }

    console.log(`📝 Inserting product: "${product.name}", Slug: "${slug}", CatID: "${categoryId}"`);

    // 2. Insert into products
    const { data: prodData, error: prodError } = await supabase
      .from('products')
      .insert({
        name: product.name,
        slug,
        description: product.description,
        brand: product.brand,
        category_id: categoryId,
        fragrance_type: product.fragranceType,
        fragrance_notes: product.notes,
        is_active: product.isActive,
        is_featured: product.isFeatured
      })
      .select()
      .single();

    if (prodError) {
      console.error("❌ Fatal DB Insert Error:", prodError);
      throw prodError;
    }
    console.log("✅ Product inserted successfully:", prodData);

    // 3. Create Variants & Images in Parallel
    const secondaryTasks = [];

    if (product.variants.length > 0) {
      const variants = product.variants.map(v => ({
        product_id: prodData.id,
        size: v.size,
        price: v.price,
        stock_quantity: v.stock,
        sku: v.sku
      }));
      secondaryTasks.push(supabase.from('product_variants').insert(variants));
    }

    if (product.images.length > 0) {
      const images = product.images.map((url, idx) => ({
        product_id: prodData.id,
        image_url: url,
        sort_order: idx,
        is_primary: idx === 0
      }));
      secondaryTasks.push(supabase.from('product_images').insert(images));
    }

    if (secondaryTasks.length > 0) {
      const results = await Promise.all(secondaryTasks);
      const errors = results.filter(r => r.error).map(r => r.error);
      if (errors.length > 0) throw errors[0];
    }

    return {
      ...product,
      id: prodData.id,
      createdAt: prodData.created_at
    } as Product;
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const updates: any = {};
    if (product.name) updates.name = product.name;
    if (product.description) updates.description = product.description;
    if (product.brand) updates.brand = product.brand;
    if (product.category) updates.category_id = product.category;
    if (product.fragranceType) updates.fragrance_type = product.fragranceType;
    if (product.notes) updates.fragrance_notes = product.notes;
    if (product.isActive !== undefined) updates.is_active = product.isActive;
    if (product.isFeatured !== undefined) updates.is_featured = product.isFeatured;

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.from('products').update(updates).eq('id', id);
      if (error) throw error;
    }

    // 2. Update Variants if provided
    if (product.variants) {
      // For simplicity, we'll delete and re-insert variants (or you could do a delta)
      // Delete existing variants
      await supabase.from('product_variants').delete().eq('product_id', id);

      // Insert new variants
      const variants = product.variants.map(v => ({
        product_id: id,
        size: v.size,
        price: v.price,
        stock_quantity: v.stock,
        sku: v.sku
      }));
      const { error: variantError } = await supabase.from('product_variants').insert(variants);
      if (variantError) throw variantError;
    }

    // 3. Update Images if provided
    if (product.images) {
      // Delete existing product-product associations in product_images
      await supabase.from('product_images').delete().eq('product_id', id);

      const images = product.images.map((url, idx) => ({
        product_id: id,
        image_url: url,
        sort_order: idx,
        is_primary: idx === 0
      }));
      const { error: imageError } = await supabase.from('product_images').insert(images);
      if (imageError) throw imageError;
    }
  }

  async createSale(sale: Omit<Sale, 'id'>): Promise<void> {
    const { error } = await supabase.from('sales').insert({
      name: sale.name,
      discount_type: sale.discountType,
      discount_value: sale.discountValue,
      is_active: sale.isActive,
      start_date: sale.startDate,
      end_date: sale.endDate,
      is_permanent: sale.isPermanent,
      applies_to: sale.appliesTo,
      target_ids: sale.targetIds
    });
    if (error) throw error;
  }

  async updateSale(id: string, sale: Partial<Sale>): Promise<void> {
    const updates: any = {};
    if (sale.name) updates.name = sale.name;
    if (sale.discountType) updates.discount_type = sale.discountType;
    if (sale.discountValue !== undefined) updates.discount_value = sale.discountValue;
    if (sale.isActive !== undefined) updates.is_active = sale.isActive;
    if (sale.startDate) updates.start_date = sale.startDate;
    if (sale.endDate !== undefined) updates.end_date = sale.endDate;
    if (sale.isPermanent !== undefined) updates.is_permanent = sale.isPermanent;
    if (sale.appliesTo) updates.applies_to = sale.appliesTo;
    if (sale.targetIds !== undefined) updates.target_ids = sale.targetIds;

    const { error } = await supabase.from('sales').update(updates).eq('id', id);
    if (error) throw error;
  }

  async deleteSale(id: string): Promise<void> {
    const { error } = await supabase.from('sales').delete().eq('id', id);
    if (error) throw error;
  }
}

export const api = new ApiService();
