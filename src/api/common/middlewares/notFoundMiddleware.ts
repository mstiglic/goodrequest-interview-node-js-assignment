import type {
    Request,
    Response
} from 'express';
import { NotFoundException } from '~lib/httpException';
import { getErrorResponseBody } from '~api/common/utils';

export default function notFoundMiddleware(req: Request, res: Response) {
    const error = new NotFoundException('PATH_NOT_FOUND', req.path);
    const exceptionBody = getErrorResponseBody({
        message: error.message,
        statusCode: error.statusCode,
        errors: error.errors
    });

    res.status(exceptionBody.statusCode).json(exceptionBody);
}
