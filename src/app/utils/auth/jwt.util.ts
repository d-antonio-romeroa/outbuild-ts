import jwt from 'jsonwebtoken';
import { encryptDataFixedLength } from '../encryption.utils';

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
}

export const generateUserJwtSecret = (userId: number, userAgent: string, ip: string) => {
    return encryptDataFixedLength(`${userId}-${userAgent}-${ip}`);
}

export const generateToken = (userId: number, userAgent: string, ip: string) => {
    return jwt.sign(
        {
            sub: userId,
        },
        generateUserJwtSecret(userId, userAgent, ip) || process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRY }
    );
}

export const decodeToken = (token: string) => {
    return jwt.decode(token) as JwtPayload;
}

export const verifyToken = (token: string, jwtSecret: string) => {
    return jwt.verify(token, jwtSecret) as JwtPayload;
}