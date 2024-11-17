import CryptoJS from "crypto-js";

// Ensure the key and IV are available from the environment variables
const KEY = process.env.ENCRYPTION_KEY || "";

export const encryptData = (data: object): string => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), KEY).toString();
  return encrypted;
};

export const decryptData = (encrypted: string): any => {
  const bytes = CryptoJS.AES.decrypt(encrypted, KEY);
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
