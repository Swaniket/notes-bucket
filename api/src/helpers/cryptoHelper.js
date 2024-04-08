import AES from "crypto-js/aes.js";
import Utf8 from "crypto-js/enc-utf8.js";

const key = process.env.ENCRYPTION_KEY;

export const encryptText = (text) => {
  const cipherText = AES.encrypt(text, key).toString();
  return cipherText;
};

export const decryptText = (encryptedText) => {
  try {
    const bytes = AES.decrypt(encryptedText, key);

    if (bytes.sigBytes > 0) {
      return bytes.toString(Utf8);
    }
    return encryptedText;
  } catch (e) {
    return encryptedText;
  }
};
