import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (product: any) => {
  const { data } = await api.post('/products', product);
  return data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};

export const getCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};

export const createCategory = async (name: string) => {
  const { data } = await api.post('/categories', { name });
  return data;
};

export const deleteCategory = async (id: string) => {
  await api.delete(`/categories/${id}`);
};

export const getSuppliers = async () => {
  const { data } = await api.get('/suppliers');
  return data;
};

export const createSupplier = async (supplier: any) => {
  const { data } = await api.post('/suppliers', supplier);
  return data;
};

export const deleteSupplier = async (id: string) => {
  await api.delete(`/suppliers/${id}`);
};

export const getCustomers = async () => {
  const { data } = await api.get('/customers');
  return data;
};

export const createCustomer = async (customer: any) => {
  const { data } = await api.post('/customers', customer);
  return data;
};

export const deleteCustomer = async (id: string) => {
  await api.delete(`/customers/${id}`);
};

export const stockEntry = async (productId: string, quantity: number, reason?: string) => {
  const { data } = await api.post('/stock/entry', { productId, quantity, reason });
  return data;
};

export const stockExit = async (productId: string, quantity: number, reason?: string) => {
  const { data } = await api.post('/stock/exit', { productId, quantity, reason });
  return data;
};

export const getStockMovements = async () => {
  const { data } = await api.get('/stock/movements');
  return data;
};

export const createSale = async (sale: any) => {
  const { data } = await api.post('/sales', sale);
  return data;
};

export const getSales = async () => {
  const { data } = await api.get('/sales');
  return data;
};

export const getSalesReport = async () => {
  const { data } = await api.get('/reports/sales');
  return data;
};

export const getStockReport = async () => {
  const { data } = await api.get('/reports/stock');
  return data;
};

export default api;
