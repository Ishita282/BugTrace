import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  const guestId = localStorage.getItem("guestId");

  req.headers = req.headers || {};

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  if (guestId) {
    req.headers["x-guest-id"] = guestId;
  }

  return req;
});

// ==============================
// CONTACT SUPPORT
// ==============================
export const sendContact = (data) => API.post("/contact", data);

// ==============================
// SHARE BUGS
// ==============================
export const getSharedBug = (token) => API.get(`/bugs/share/${token}`);

// ==============================
// GET ALL BUGS
// ==============================
export const getAllBugs = () => API.get("/bugs");

// ==============================
// GET BUGS
// ==============================
export const getBug = (id) => API.get(`/bugs/${id}`);

// ==============================
// BUGS CREATE
// ==============================
export const createBug = (data) => API.post("/bugs", data);

// ==============================
// BUGS GET STEPS
// ==============================
export const getSteps = (id) => API.get(`/bugs/${id}/steps`);

// ==============================
// BUGS STEP CREATE
// ==============================
export const createStep = (bugId, data) =>
  API.post(`/bugs/${bugId}/steps`, data);

// ==============================
// BUGS STEP DELETE
// ==============================
export const deleteStep = (bugId, stepId) =>
  API.delete(`/bugs/${bugId}/steps/${stepId}`);

// ==============================
// BUGS STEP UPDATE
// ==============================
export const updateStep = (bugId, stepId, data) =>
  API.put(`/bugs/${bugId}/steps/${stepId}`, data);

