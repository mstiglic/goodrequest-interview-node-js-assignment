import type { USER_ROLE } from '~utils/enums';
import type {
    NextFunction,
    Request,
    Response
} from 'express';
import { ForbiddenException } from '~lib/httpException';

export const roleGuardMiddleware = (role: USER_ROLE) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return next(new ForbiddenException('FORBIDDEN_ACCESS'));
        }
        next();
    };
};
