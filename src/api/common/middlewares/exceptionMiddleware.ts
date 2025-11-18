import type {
    ErrorRequestHandler,
} from 'express';
import { constants } from 'http2';
import { HttpException } from '~lib/httpException';

import { ForeignKeyConstraintError } from 'sequelize';
import { getErrorResponseBody } from '~api/common/utils';

const {
    HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_BAD_REQUEST
} = constants;

const httpExceptionMiddleware: ErrorRequestHandler = (
    error: Error,
    req,
    res,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next
) => {
    if (error instanceof ForeignKeyConstraintError) {
        const body = getErrorResponseBody(
            {
                message: error.message,
                statusCode: HTTP_STATUS_BAD_REQUEST,
                errors: error.fields,
            },
            error.stack,
            error.cause
        );
        res.status(body.statusCode).json(body);

        return;
    }

    if (error instanceof HttpException) {
        const body = getErrorResponseBody(
            {
                message: error.message,
                statusCode: error.statusCode,
                errors: error.errors,
            },
            error.stack,
            error.cause
        );
        res.status(body.statusCode).json(body);

        return;
    }

    const body = getErrorResponseBody(
        {
            message: 'SOMETHING_WENT_WRONG',
            statusCode: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        },
        error.stack,
        error.cause
    );

    res.status(body.statusCode).json(body);
    return;
};

export default httpExceptionMiddleware;
