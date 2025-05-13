export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: number;
    name?: string;
    email?: string;
    imageUrl?: string;
  } | null;
  token: string | null;
}

export interface Review {
  username: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  title: string;
  type: string;
  brand_id: number;
  original_price: number;
  sale_price: string | number;
  rating: number;
  review_count: number;
  short_description: string;
  detail_description: string;
  additional_information: string;
  colors: string[];
  imageUrls: string[];
  reviews: Review[];
  isInWishlist: boolean;
}

export interface CarouselComponentProps {
  carouselData: Product[];
}

export interface ProductState {
  category: number;
  brands: string[];
  filteredProducts: Product[];
}

export interface ProductCardProps {
  product: Product;
  isLoading: Boolean;
}

export interface Wishlist {
  id: number;
  product: Product;
  productId: number;
  userId: number;
}
