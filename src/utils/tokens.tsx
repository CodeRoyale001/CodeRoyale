import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token: string) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true; // If decoding fails or no expiry info
  const expiryTime = decoded.exp * 1000; // Convert to milliseconds
  return Date.now() > expiryTime;
};
