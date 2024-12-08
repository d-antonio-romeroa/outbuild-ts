import bcrypt from "bcryptjs";
import crypto from 'crypto';

const SECRET_KEY = Buffer.from(process.env.SECRET_KEY || crypto.randomBytes(32));
const IV = Buffer.from(process.env.IV || crypto.randomBytes(16));


/**
 * Encrypt data to ensure fixed-length output.
 * @param data - The data to encrypt.
 * @returns The encrypted data as a fixed-length base64 string.
 */
export const encryptDataFixedLength = (data: string): string => {
    // console.log(process.env.SECRET_KEY, process.env.IV, SECRET_KEY.length, IV.length);
    const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, IV);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

/**
 * Decrypt fixed-length encrypted data.
 * @param encryptedData - The encrypted string to decrypt.
 * @returns The original decrypted string.
 */
export const decryptDataFixedLength = (encryptedData: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, IV);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10);
}

export const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
}