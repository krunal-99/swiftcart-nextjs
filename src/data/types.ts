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
