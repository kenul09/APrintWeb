import { backendFetch } from './backend';

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.search) query.set('search', params.search);
  if (params.unreadOnly) query.set('unreadOnly', 'true');
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export const contactService = {
  async getAll(params = {}) {
    return backendFetch(`/contact${buildQuery(params)}`);
  },
  async markRead(id) {
    const { data } = await backendFetch(`/contact/${id}/read`, { method: 'PATCH' });
    return data;
  },
  async markUnread(id) {
    const { data } = await backendFetch(`/contact/${id}/unread`, { method: 'PATCH' });
    return data;
  },
  async remove(id) {
    await backendFetch(`/contact/${id}`, { method: 'DELETE' });
  },
};
