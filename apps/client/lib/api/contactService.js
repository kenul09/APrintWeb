import { apiRequest } from "./client";

export const contactService = {
  async create(payload) {
    const { data } = await apiRequest("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  },
};
