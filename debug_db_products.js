import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase env variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProducts() {
    const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error("❌ Error fetching products:", error);
    } else {
        console.log(`✅ Total products in DB: ${count}`);
    }

    const { data: activeProds, error: activeError } = await supabase
        .from('products')
        .select('id')
        .eq('is_active', true);

    if (activeError) {
        console.error("❌ Error fetching active products:", activeError);
    } else {
        console.log(`✅ Total active products: ${activeProds?.length || 0}`);
    }
}

checkProducts();
