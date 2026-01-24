import CryptoJSUtilFile from "crypto-js";
import fs from "fs";
import path from "path";

let envFilePath = path.resolve(__dirname, '../config/.env');
if (process.env.NODE_ENV) {
    envFilePath = path.resolve(__dirname, `../config/.env.${process.env.NODE_ENV}`);
}
console.log(envFilePath);

export function encryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  // Encrypt values and update the array
  const encryptedLines = envLines.map((envLine) => {
    const [key, value] = envLine.split("=");

    if (value) {
      const encryptedValue = CryptoJSUtilFile.AES.encrypt(value, SALT).toString();
      return `${key}=${encryptedValue}`;
    }

    return envLine;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = encryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Encryption complete. Updated .env file.");
}

export function decryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  const envLines = envFileContent.split("\n");

  // Encrypt values and update the array
  const decryptedLines = envLines.map((envLine) => {
    const [key, value] = envLine.split("=");

    if (value) {
      const decryptedValue = CryptoJSUtilFile.AES.decrypt(value, SALT).toString(
        CryptoJSUtilFile.enc.Utf8,
      );

      return `${key}=${decryptedValue}`;
    }

    return envLine;
  });

  // Join the lines and write back to the .env file
  const updatedEnvContent = decryptedLines.join("\n");
  fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

  console.log("Decryption complete. Updated .env file.");
}