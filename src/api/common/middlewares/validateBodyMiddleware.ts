import type { ZodObject } from 'zod';
import {
    ZodError
} from 'zod';

import type {
    NextFunction,
    RequestHandler,
    Request,
    Response
} from 'express';
import {
    BadRequestException,
    InternalServerException
} from '~lib/httpException';

export default function validateBodyMiddleware(schema: ZodObject<any>): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                throw new BadRequestException('INVALID_REQUEST_BODY', error.message);
            }

            throw new InternalServerException();
        }
    };
}
