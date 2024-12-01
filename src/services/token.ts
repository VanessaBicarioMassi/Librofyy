import * as jwt from 'jsonwebtoken';
import { userRole } from '../types/user';

export async function generateToken(payload: payload) {
    return jwt.sign(
        {
            id: payload.id,
            role: payload.role
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "90m" }
    );
}

export function verifyToken(token: string): payload {
    const tokenData: payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as payload;
    return tokenData;
}

export type payload = {
    id: string,
    role: userRole
};
