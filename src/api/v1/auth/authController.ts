import type {
    NextFunction,
    Request
} from 'express';
import type {
    IAuthUserDetails
} from '~api/v1/auth/authTypes';
import authService from '~api/v1/auth/authService';

import type {
    TLoginSchema,
    TRegisterSchema
} from '~api/v1/auth/authSchema';
import type { THttpResponseFunction } from '~types/http';
import { getSuccessResponseBody } from '~api/common/utils';

async function register(
    req: Request<{}, TRegisterSchema>,
    res: THttpResponseFunction<IAuthUserDetails>,
    next: NextFunction
) {
    try {
        const data = await authService.register(req.body);

        res.json(getSuccessResponseBody({
            message: 'USER_CREATED',
            data
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function login(
    req: Request<{}, TLoginSchema>,
    res: THttpResponseFunction<IAuthUserDetails>,
    next: NextFunction
) {
    try {
        const data = await authService.login(req.body);

        res.json(getSuccessResponseBody({
            message: 'USER_LOGGED_IN',
            data
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

export default {
    register,
    login
};
