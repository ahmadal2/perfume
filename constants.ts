// Product and Category Constants for L'Essence Royale

export interface Product {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    description: string;
    category: string;
    notes: {
        top: string[];
        middle: string[];
        base: string[];
    };
    variants: {
        id: string;
        size: string;
        price: number;
    }[];
    inStock: boolean;
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

export const CATEGORIES: Category[] = [
    {
        id: 'oriental',
        name: 'Oriental',
        description: 'Rich, exotic fragrances with warm spices and amber'
    },
    {
        id: 'woody',
        name: 'Woody',
        description: 'Earthy, sophisticated scents with sandalwood and cedar'
    },
    {
        id: 'floral',
        name: 'Floral',
        description: 'Elegant, romantic fragrances with rose and jasmine'
    },
    {
        id: 'fresh',
        name: 'Fresh',
        description: 'Clean, invigorating scents with citrus and aquatic notes'
    },
    {
        id: 'gourmand',
        name: 'Gourmand',
        description: 'Sweet, indulgent fragrances with vanilla and caramel'
    }
];

export const PRODUCTS: Product[] = [
    {
        id: '1',
        slug: 'khamrah',
        name: 'Khamrah',
        brand: "Lattafa",
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
        description: 'A luxurious oriental fragrance with rich notes of cinnamon, nutmeg, and praline, complemented by a warm base of vanilla, tonka bean, and amber.',
        category: 'oriental',
        notes: {
            top: ['Cinnamon', 'Nutmeg', 'Bergamot'],
            middle: ['Dates', 'Praline', 'Tuberose'],
            base: ['Vanilla', 'Tonka Bean', 'Amber', 'Myrrh', 'Benzoin', 'Akigalawood']
        },
        variants: [
            { id: '1-50ml', size: '50ml', price: 89.99 },
            { id: '1-100ml', size: '100ml', price: 149.99 }
        ],
        inStock: true
    },
    {
        id: '2',
        slug: 'oud-wood',
        name: 'Oud Wood Intense',
        brand: "Maison Royale",
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
        description: 'An intense woody fragrance featuring rare oud wood, complemented by exotic spices and rich amber.',
        category: 'woody',
        notes: {
            top: ['Cardamom', 'Pink Pepper', 'Saffron'],
            middle: ['Oud Wood', 'Sandalwood', 'Vetiver'],
            base: ['Amber', 'Patchouli', 'Musk']
        },
        variants: [
            { id: '2-50ml', size: '50ml', price: 129.99 },
            { id: '2-100ml', size: '100ml', price: 199.99 }
        ],
        inStock: true
    },
    {
        id: '3',
        slug: 'rose-elixir',
        name: 'Rose Elixir',
        brand: "L'Essence Royale",
        price: 109.99,
        image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
        description: 'A sophisticated floral fragrance centered around the finest Bulgarian rose, enhanced with jasmine and iris.',
        category: 'floral',
        notes: {
            top: ['Bergamot', 'Lychee', 'Freesia'],
            middle: ['Bulgarian Rose', 'Jasmine', 'Iris'],
            base: ['Musk', 'Cedarwood', 'Amber']
        },
        variants: [
            { id: '3-50ml', size: '50ml', price: 109.99 },
            { id: '3-100ml', size: '100ml', price: 169.99 }
        ],
        inStock: true
    },
    {
        id: '4',
        slug: 'azure-breeze',
        name: 'Azure Breeze',
        brand: "Aqua Luxe",
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800',
        description: 'A refreshing aquatic fragrance with citrus and marine notes, perfect for everyday wear.',
        category: 'fresh',
        notes: {
            top: ['Bergamot', 'Lemon', 'Sea Salt'],
            middle: ['Marine Accord', 'Lavender', 'Geranium'],
            base: ['Cedarwood', 'Musk', 'Amber']
        },
        variants: [
            { id: '4-50ml', size: '50ml', price: 79.99 },
            { id: '4-100ml', size: '100ml', price: 129.99 }
        ],
        inStock: true
    },
    {
        id: '5',
        slug: 'vanilla-noir',
        name: 'Vanilla Noir',
        brand: "Gourmand House",
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800',
        description: 'A decadent gourmand fragrance featuring Madagascar vanilla, caramel, and warm spices.',
        category: 'gourmand',
        notes: {
            top: ['Caramel', 'Almond', 'Coffee'],
            middle: ['Madagascar Vanilla', 'Tonka Bean', 'Praline'],
            base: ['Sandalwood', 'Musk', 'Amber']
        },
        variants: [
            { id: '5-50ml', size: '50ml', price: 99.99 },
            { id: '5-100ml', size: '100ml', price: 159.99 }
        ],
        inStock: true
    },
    {
        id: '6',
        slug: 'leather-oud',
        name: 'Leather & Oud',
        brand: "Maison Royale",
        price: 139.99,
        image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800',
        description: 'A powerful blend of smoky leather and precious oud, creating an unforgettable signature scent.',
        category: 'woody',
        notes: {
            top: ['Black Pepper', 'Cardamom', 'Bergamot'],
            middle: ['Leather', 'Oud', 'Tobacco'],
            base: ['Patchouli', 'Vetiver', 'Amber']
        },
        variants: [
            { id: '6-50ml', size: '50ml', price: 139.99 },
            { id: '6-100ml', size: '100ml', price: 219.99 }
        ],
        inStock: true
    }
];

// WhatsApp contact number for orders
export const WHATSAPP_NUMBER = '+4915560549529';
