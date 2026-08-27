import { backendFetch } from './backend';

export const contactService = {
  async getAll() {
    const { data } = await backendFetch('/contact');
    return data;
  },
  async markRead(id) {
    const { data } = await backendFetch(`/contact/${id}/read`, { method: 'PATCH' });
    return data;
  },
  async remove(id) {
    await backendFetch(`/contact/${id}`, { method: 'DELETE' });
  },
};
