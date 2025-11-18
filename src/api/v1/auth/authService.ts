import { models } from '~db/sequelize';
import type {
    TLoginSchema, TRegisterSchema
} from '~api/v1/auth/authSchema';
import type { IAuthUserDetails } from '~api/v1/auth/authTypes';

import { generateToken } from '~lib/auth/jwt';
import type { IUserModel } from '~db/models/userModel';
import {
    ConflictException, UnauthorizedException
} from '~lib/httpException';
import bcrypt from 'bcrypt';

async function getUserByEmail(email: string): Promise<IUserModel | null> {
    return await models.User.findOne({
        where: {
            email,
        },
        attributes: [
            'id',
            'email',
            'name',
            'password'
        ],
        raw: true,
    });
}

async function verifyPassword(plaintextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
}

async function register({
    name,
    surname,
    nickName,
    email,
    age,
    password,
    role
}: TRegisterSchema): Promise<IAuthUserDetails> {
    const user = await getUserByEmail(email);

    if (user) {
        throw new ConflictException('USER_ALREADY_EXISTS');
    }

    const createdUser = await models.User.create({
        name,
        surname,
        nickName,
        email,
        age,
        password,
        role,
    });
    const jwtToken = generateToken(createdUser);

    return {
        token: jwtToken,
        id: createdUser.id
    };
}

async function login(credentials: TLoginSchema): Promise<IAuthUserDetails> {
    const user = await getUserByEmail(credentials.email);

    if (!user) {
        throw new UnauthorizedException('USER_NOT_FOUND_WITH_EMAIL');
    }

    const hasCorrectPassword = await verifyPassword(credentials.password, user.password);

    if (!hasCorrectPassword) {
        throw new UnauthorizedException('INCORRECT_PASSWORD');
    }

    const jwtToken = generateToken(user);

    return {
        token: jwtToken,
        id: user.id
    };
}


export default {
    register,
    login
};
