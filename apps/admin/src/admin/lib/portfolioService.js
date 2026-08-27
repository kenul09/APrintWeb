import { backendFetch } from './backend';

export const portfolioService = {
  async getAll() {
    const { data } = await backendFetch('/portfolio');
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
