import { backendFetch } from './backend';

export const ORDER_STATUSES = [
  { value: 'NEW', label: 'Yeni' },
  { value: 'IN_REVIEW', label: 'Baxılır' },
  { value: 'CONFIRMED', label: 'Təsdiqləndi' },
  { value: 'COMPLETED', label: 'Tamamlandı' },
  { value: 'CANCELLED', label: 'Ləğv edildi' },
];

export function orderStatusLabel(status) {
  return ORDER_STATUSES.find((s) => s.value === status)?.label || status;
}

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.search) query.set('search', params.search);
  if (params.status) query.set('status', params.status);
  if (params.sort) query.set('sort', params.sort);
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export const orderService = {
  async getAll(params = {}) {
    return backendFetch(`/orders${buildQuery(params)}`);
  },
  async getOne(id) {
    const { data } = await backendFetch(`/orders/${id}`);
    return data;
  },
  async create(payload) {
    const { data, message } = await backendFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { data, message };
  },
  async updateStatus(id, status) {
    const { data, message } = await backendFetch(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return { data, message };
  },
  async remove(id) {
    await backendFetch(`/orders/${id}`, { method: 'DELETE' });
  },
};
