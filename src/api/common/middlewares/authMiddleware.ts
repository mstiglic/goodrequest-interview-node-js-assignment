import type {
    NextFunction,
    Request,
    Response
} from 'express';
import passport from '~lib/auth/passport';
import type { IUserModel } from '~db/models/userModel';
import { loggerCli } from '~lib/logger';
import {
    InternalServerException, UnauthorizedException
} from '~lib/httpException';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (err: Error | null, user?: IUserModel, info?: Error) => {
        if (err) {
            loggerCli.error(`JWT Strategy error: ${err.message}`, );
            return next(new InternalServerException('SOMETHING_WENT_WRONG'));
        }

        if (!user || info?.message) {
            loggerCli.error(`JWT error: ${info?.message}`, );
            return next(new UnauthorizedException('UNAUTHORIZED_ACCESS'));
        }

        req.user = user;
        next();
    })(req, res, next);
}
