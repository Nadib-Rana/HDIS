import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // Update this if your backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});