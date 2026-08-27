import { backendFetch } from './backend';

export const dashboardService = {
  async getStats() {
    const { data } = await backendFetch('/dashboard/stats');
    return data;
  },
};
