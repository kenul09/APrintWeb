import { backendFetch } from './backend';

export const productService = {
  async getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    const qs = query.toString();
    const { data } = await backendFetch(`/products${qs ? `?${qs}` : ''}`);
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
