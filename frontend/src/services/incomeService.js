import API from "../api/axios";

export const getIncome = () => API.get("/income");
export const addIncome = (data) => API.post("/income", data);
export const updateIncome = (id, data) => API.put(`/income/${id}`, data);
export const deleteIncome = (id) => API.delete(`/income/${id}`);
