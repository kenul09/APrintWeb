import { backendFetch } from './backend';

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.search) query.set('search', params.search);
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export const customerService = {
  async getAll(params = {}) {
    return backendFetch(`/customers${buildQuery(params)}`);
  },
  async getOne(id) {
    const { data } = await backendFetch(`/customers/${id}`);
    return data;
  },
};
