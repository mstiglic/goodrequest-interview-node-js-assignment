import jwt from 'jsonwebtoken';
import type { IUserModel } from '~db/models/userModel';
import { ENV_CONFIG } from '~lib/env';

export type TUserJwtTokenPayload = Pick<IUserModel, 'id' | 'email' | 'name'>

export function generateToken (user: IUserModel) {
    const payload: TUserJwtTokenPayload = {
        id: user.id,
        email: user.email,
        name: user.name
    };

    return jwt.sign(
        payload,
        ENV_CONFIG.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
}
