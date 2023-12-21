import { jwtDecode } from "jwt-decode";

export const getTokenValues = () => {
  const token = localStorage.getItem("token");
  const decodedData = jwtDecode(token || "");
  if (!decodedData) {
    return null;
  }

  return decodedData;
};
