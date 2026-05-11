// Re-export API from feature modules
export { authAPI } from '@/features/auth/api/authAPI';
export { adminAPI } from '@/features/admin/api/adminAPI';
export { productsAPI } from '@/features/product/api/productsAPI';
export type { ProductData, ProductResponse } from '@/features/product/api/productsAPI';
export type { LoginCredentials, UserResponse, UserRegistrationData, AuthenticationResponse } from '@/features/auth/api/authAPI';
export type { AdminLoginCredentials, AdminResponse } from '@/features/admin/api/adminAPI';
