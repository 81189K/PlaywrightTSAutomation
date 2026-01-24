// Include CryptoJS library (make sure to include it in your project): 
    // npm install crypto-js
    // npm install -D @types/crypto-js
// You can download it from: https://cryptojs.gitbook.io/docs/
let CryptoJSUtil = require("crypto-js");

// Get the SALT value from environment variables or use a default value
const SALT = process.env.SALT || "defaultSalt";

// Encryption function
export function encryptData(data: string): string {
    const ciphertext = CryptoJSUtil.AES.encrypt(data, SALT).toString();
    return ciphertext;
}

// Decryption function
export function decryptData(ciphertext: string): string {
  const bytes = CryptoJSUtil.AES.decrypt(ciphertext, SALT);
  const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
  return originalText;
}