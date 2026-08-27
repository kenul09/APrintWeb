import { backendFetch } from './backend';

export const productService = {
  async getAll() {
    const { data } = await backendFetch('/products');
    return data;
  },
  async create(payload) {
    const { data } = await backendFetch('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data;
  },
  async update(id, payload) {
    const { data } = await backendFetch(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return data;
  },
  async remove(id) {
    await backendFetch(`/products/${id}`, { method: 'DELETE' });
  },
};
