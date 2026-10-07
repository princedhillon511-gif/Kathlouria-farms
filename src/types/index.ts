export interface ProductSizeOption {
  size: string;
  price: number;
  mrp: number;
  inStock: boolean;
  weightGrams: number;
}

export interface ProductNutrition {
  servingSize: string;
  energyKcal: number;
  proteinG: number;
  carbohydrateG: number;
  dietaryFibreG: number;
  totalFatG: number;
  saturatedFatG?: number;
  sodiumMg: number;
}

export interface MasalaBenefit {
  title: string;
  description: string;
  highlight: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subName?: string;
  vernacularName?: string;
  category: 'ground-spices' | 'whole-spices' | 'heritage-blends' | 'gift-collections';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  benefits?: MasalaBenefit[];
  culinaryUses?: string[];
  basePrice: number;
  sizes: ProductSizeOption[];
  ingredients: string;
  netQuantity: string;
  origin: string;
  storageInstructions: string;
  allergenInformation: string;
  nutritionalInformation: ProductNutrition;
  manufacturer: string;
  packer: string;
  fssaiLicenceNo: string;
  batchNo: string;
  dateOfPacking: string;
  bestBefore: string;
  isFeatured?: boolean;
  isHero?: boolean;
  accentNote?: string;
  colorTone: string;
  seoTitle: string;
  metaDescription: string;
  tags: string[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  selectedSize: string;
  price: number;
  mrp: number;
  quantity: number;
  weightGrams: number;
  colorTone: string;
}

export interface BusinessConfig {
  brandName: string;
  tagline: string;
  estdYear: string;
  fssaiLicenceNo: string;
  fboName: string;
  manufacturerName: string;
  packerName: string;
  businessAddress: string;
  customerCareNumber: string;
  customerCareEmail: string;
  operatingHours: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'razorpay';
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerInfo: OrderCustomerInfo;
  status: 'Confirmed' | 'Processing' | 'Dispatched';
  estimatedDelivery: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
}
