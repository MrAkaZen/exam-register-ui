import apiClient from "./apiClient";

const professoriApi = {
  /* =====================
     LISTA
  ===================== */

  getAll: (page = 0, size = 10) =>
    apiClient.get("/professori", {
      params: { page, size },
    }),

  getAllSimple: () =>
    apiClient.get("/professori").then((res) => res.data),

  /* =====================
     DETAIL
  ===================== */

  getById: (id) =>
    apiClient.get(`/professori/${id}`).then((res) => res.data),

  /* =====================
     CREATE / UPDATE / DELETE
  ===================== */

  create: (data) =>
    apiClient.post("/professori", data).then((res) => res.data),

  update: (id, data) =>
    apiClient.put(`/professori/${id}`, data).then((res) => res.data),

  remove: (id) =>
    apiClient.delete(`/professori/${id}`),

  /* =====================
     BATCH
  ===================== */

  createBatch: (data) =>
    apiClient.post("/professori/batch", data).then((res) => res.data),

  /* =====================
     SEARCH
  ===================== */

  search: (filter = {}, page = 0, size = 10) =>
    apiClient.get("/professori/ricerca/avanzata", {
      params: {
        page,
        size,
        ...filter,
      },
    }),
};

export default professoriApi;