import apiClient from '@/lib/apiClient';

export interface ProductData {
  title: string;
  description: string;
  price: number;
  type: 'SELL' | 'LEND';
  category: string;
  condition?: string;
  userId: string;
  imageUrl?: string;
}

export interface ProductResponse {
  productId: number;
  title: string;
  description: string;
  price: number;
  type: string;
  category: string;
  condition?: string;
  imageUrl?: string;
  status: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export const productsAPI = {
  getAll: async (): Promise<ProductResponse[]> => {
    const response = await apiClient.get<ProductResponse[]>('/products');
    return response.data;
  },

  getById: async (id: number): Promise<ProductResponse> => {
    const response = await apiClient.get<ProductResponse>(`/products/${id}`);
    return response.data;
  },

  create: async (productData: ProductData): Promise<ProductResponse> => {
    const response = await apiClient.post<ProductResponse>('/products', productData);
    return response.data;
  },

  createWithImage: async (productData: ProductData, image?: File): Promise<ProductResponse> => {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', String(productData.price));
    formData.append('type', productData.type);
    formData.append('category', productData.category);
    if (productData.condition) formData.append('condition', productData.condition);
    formData.append('userId', productData.userId);
    if (image) formData.append('image', image);

    const response = await apiClient.post<ProductResponse>('/products/with-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000,
    });
    return response.data;
  },

  getUserProducts: async (userId: string): Promise<ProductResponse[]> => {
    const response = await apiClient.get<ProductResponse[]>(`/products/user/${userId}`);
    return response.data;
  },
};