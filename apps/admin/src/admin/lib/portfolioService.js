import { backendFetch } from './backend';

export const portfolioService = {
  async getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    const qs = query.toString();
    const { data } = await backendFetch(`/portfolio${qs ? `?${qs}` : ''}`);
    return data;
  },
  async create(payload) {
    const { data } = await backendFetch('/portfolio', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data;
  },
  async update(id, payload) {
    const { data } = await backendFetch(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return data;
  },
  async remove(id) {
    await backendFetch(`/portfolio/${id}`, { method: 'DELETE' });
  },
};
