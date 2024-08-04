import axios from "axios";

const api = axios.create({
  baseURL: "http://http://127.0.0.1:8000/api",
});

export const register = (user) => api.post("/register/", user);
export const login = (user) => api.post("/login/", user);
export const addTrain = (train, token) =>
  api.post("/trains/add/", train, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getTrains = (params, token) =>
  api.get("/trains/", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
export const bookSeat = (booking, token) =>
  api.post("/bookings/", booking, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getBooking = (id, token) =>
  api.get(`/bookings/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
