import API from "../api/axios";

export const getSummary = () => API.get("/analytics/summary");
export const getMonthlyData = () => API.get("/analytics/monthly");
export const getCategoryData = () => API.get("/analytics/by-category");
