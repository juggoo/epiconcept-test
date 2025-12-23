import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const api = axios.create({ baseURL });
export const setTenantHeader = (tenantId: string) => {
  api.defaults.headers.common["X-Tenant-Id"] = tenantId;
};
export default api;
