import type {
    NextFunction, Request, RequestHandler
} from 'express';
import { NotFoundException } from '~lib/httpException';
import usersService from '~api/v1/users/usersService';
import {
    getSuccessResponseBody, requireUser
} from '~api/common/utils';
import type { TPartialUpdateUserSchema } from '~api/v1/users/usersSchema';
import { USER_ROLE } from '~utils/enums';
import type {
    IHttpSuccessResponseBody, THttpResponseFunction
} from '~types/http';
import type { IUserModel } from '~db/models/userModel';

async function getAllUsers(
    req: Request,
    res: THttpResponseFunction<IUserModel[]>,
    next: NextFunction
) {
    try {
        const loggedUser = requireUser(req);
        const data = await usersService.getAllUsers(loggedUser.role);

        res.json(getSuccessResponseBody({
            message: 'LIST_OF_USERS',
            data,
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function getUserById(
    req: Request<{userId: string}>,
    res: THttpResponseFunction<IUserModel | null>,
    next: NextFunction
) {
    try {
        const loggedUser = requireUser(req);

        const data = await usersService.getUserById(Number(req.params.userId), loggedUser.role);

        if (!data) {
            throw new NotFoundException('USER_NOT_FOUND');
        }

        res.json(getSuccessResponseBody({
            message: `USER_DETAIL ${req.params.userId}`,
            data,
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function getUserProfile(
    req: Request,
    res: THttpResponseFunction<IUserModel | null>,
    next: NextFunction
) {
    try {
        const loggedUser = requireUser(req);

        const data = await usersService.getUserById(loggedUser.id, loggedUser.role);

        res.json(getSuccessResponseBody({
            data,
            message: 'USER_PROFILE'
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

function partialUpdateUser(role: USER_ROLE = USER_ROLE.USER): RequestHandler<
    { userId: string },
    IHttpSuccessResponseBody<IUserModel | null>,
    TPartialUpdateUserSchema
> {
    return async (req, res, next) => {
        try {
            const loggedUser = requireUser(req);
            const userIdByRole: Record<USER_ROLE, number> = {
                [USER_ROLE.ADMIN]: Number(req.params.userId),
                [USER_ROLE.USER]: loggedUser.id
            };
            const data = await usersService.partialUpdateUserById(req.body, userIdByRole[role]);
            res.json(getSuccessResponseBody({
                message: 'USER_UPDATED',
                data
            }));
        } catch (err: unknown) {
            return next(err);
        }
    };
};



export default {
    getAllUsers,
    getUserById,
    getUserProfile,
    partialUpdateUser,
};
