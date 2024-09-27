import CryptoJS from "crypto-js";

const secretKey: string = process.env.COOKIES_SECRET || "Default_key"; // Use a strong key for encryption

// Hash and shorten the key to 16 characters
const hashKey = (key: string): string => {
  const hashedKey = CryptoJS.SHA256(key).toString();
  return hashedKey.substring(0, 16); // Shorten to 16 characters
};

export const setCookie = (
  key: string,
  data: string,
  expiration: number,
): void => {
  const hashedKey = hashKey(key); // Hash the key

  expiration = expiration || Number(process.env.COOKIES_EXPIRY_TIME);

  // Encrypt the data
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  const sanitizedData = encodeURIComponent(encryptedData);

  const date = new Date();
  date.setTime(date.getTime() + expiration * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  // Use Secure and SameSite attributes
  const secure = "secure";
  const sameSite = "SameSite=Strict";

  document.cookie = `${hashedKey}=${sanitizedData}; ${expires}; path=/; ${secure}; ${sameSite}`;
};

export const getCookie = (key: string): string => {
  const hashedKey = hashKey(key); // Hash the key

  const name = `${hashedKey}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      const encryptedData = cookie.substring(name.length, cookie.length);

      // Decrypt the data
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return decryptedData;
    }
  }

  // If the cookie is not found, throw an error
  throw new Error(`Cookie with key "${key}" not found.`);
};

export const deleteCookie = (key: string): void => {
  const hashedKey = hashKey(key); // Hash the key
  document.cookie = `${hashedKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=Strict`;
};
