import { apiRequest } from "./client";

export const productService = {
  async getAll({ activeOnly } = {}) {
    const query = activeOnly ? "?active=true" : "";
    const { data } = await apiRequest(`/products${query}`);
    return data;
  },
  async getById(id) {
    const { data } = await apiRequest(`/products/${id}`);
    return data;
  },
};
