import { apiRequest } from "./client";

export const portfolioService = {
  async getAll() {
    const { data } = await apiRequest("/portfolio");
    return data;
  },
  async getById(id) {
    const { data } = await apiRequest(`/portfolio/${id}`);
    return data;
  },
};
