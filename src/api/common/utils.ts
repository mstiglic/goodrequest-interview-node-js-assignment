import type {
    Request,
    Router
} from 'express';
import type { IUserModel } from '~db/models/userModel';
import { InternalServerException } from '~lib/httpException';
import type {
    IHttpErrorResponseBody, IHttpSuccessResponseBody
} from '~types/http';
import { loggerCli } from '~lib/logger';
import { ENV_CONFIG } from '~lib/env';
import {
    LOCALES, translate
} from '~configs/locales';

export function createPrefixedRouter(router: Router, prefix: string) {
    const original = router.route.bind(router);

    router.route = (path: string) => original(prefix + path);

    return router;
}

export function requireUser(req: Request): IUserModel {
    if (!req.user) throw new InternalServerException('SOMETHING_WENT_WRONG');
    return req.user;
}

export function getErrorResponseBody(
    error: Omit<IHttpErrorResponseBody, 'success'>,
    stack?: string,
    cause?: unknown
): IHttpErrorResponseBody {
    loggerCli.error(translate(error.message, LOCALES.EN));

    if (ENV_CONFIG.MODE === 'dev') {
        if (stack) {
            loggerCli.debug(`Stack: ${stack}`);
        }

        if (cause) {
            loggerCli.debug(`Cause: ${cause}`);
        }
    }

    return {
        success: false,
        ...error
    };
}

export function getSuccessResponseBody<Body = unknown>(
    success: Omit<IHttpSuccessResponseBody<Body>, 'success'>
): IHttpSuccessResponseBody<Body> {
    return {
        ...success,
        success: true,
    };
}
