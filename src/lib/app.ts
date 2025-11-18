import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import {
    SERVER_CORS_OPTIONS,
    SERVER_ENABLE_PROXY
} from '~configs/server';
import { getLoggerMorganFormattedOutput } from '~lib/logger';
import { ENV_CONFIG } from '~lib/env';
import NotFoundMiddleware from '~api/common/middlewares/notFoundMiddleware';
import ExceptionMiddleware from '~api/common/middlewares/exceptionMiddleware';
import rateLimit from 'express-rate-limit';
import passport from '~lib/auth/passport';
import { routes } from '~api/routes';
import LocalizationMiddleware from '~api/common/middlewares/localizationMiddleware';

const app = express();

app.disable(SERVER_ENABLE_PROXY);
app.disable('x-powered-by');

app.use(
    morgan(getLoggerMorganFormattedOutput),
);
app.use(helmet());
app.use(cors(SERVER_CORS_OPTIONS));
app.use(compression());
app.use(express.json({
    limit: '2mb'
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.',
}));
app.use(express.urlencoded({ extended: true }));
app.use(LocalizationMiddleware);
app.use(`/${ENV_CONFIG.API_PREFIX}/v1`, routes.v1);

app.use(ExceptionMiddleware);
app.use(NotFoundMiddleware);
app.use(passport.initialize());

export default app;
