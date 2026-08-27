import { backendFetch } from './backend';

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.search) query.set('search', params.search);
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export const blogService = {
  async getAll(params = {}) {
    return backendFetch(`/blog${buildQuery(params)}`);
  },
  async getOne(id) {
    const { data } = await backendFetch(`/blog/${id}`);
    return data;
  },
  async create(payload) {
    const { data, message } = await backendFetch('/blog', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { data, message };
  },
  async update(id, payload) {
    const { data, message } = await backendFetch(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return { data, message };
  },
  async remove(id) {
    await backendFetch(`/blog/${id}`, { method: 'DELETE' });
  },
};
