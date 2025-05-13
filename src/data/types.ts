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

export type contactUser = {
  name?: string;
  email?: string;
  phone?: number;
  subject?: string;
  message?: string;
};

export interface shopCardData {
  id: number;
  name: string;
  label: string;
  imageUrl: string;
}

export interface ShopCardProps {
  data: shopCardData | null;
  onClick: () => void;
  isLoading: Boolean;
}

export interface Brand {
  id: number;
  name: string;
  categoryId: number;
}
export interface Categories {
  id: number;
  name: string;
  label: string;
  imageUrl: string;
  brands: Brand[];
}

export interface FilterBarProps {
  isMobile: boolean;
  onClose?: () => void;
  categories: Categories[];
  isLoading: Boolean;
  selectedCategory: number;
  selectedBrands: string[];
  priceRange: [number, number];
  onCategoryChange: (category: number) => void;
  onBrandChange: (brands: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
}

export type SortOption =
  | "popularity"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";

export interface ShopHeroProps {
  title: string;
  subtitle: string;
  onFilterClick?: () => void;
  sortBy: string;
  onSortChange: (value: SortOption) => void;
}

export interface FilterParams {
  page?: number;
  search?: string;
  category?: number;
  priceRange?: [number, number];
  brands?: string[];
  sortBy?: SortOption;
}
