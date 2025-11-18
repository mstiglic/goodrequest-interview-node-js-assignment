import {
    Router
} from 'express';
import { createPrefixedRouter } from '~api/common/utils';
import validateBodyMiddleware from '~api/common/middlewares/validateBodyMiddleware';
import {
    loginSchema,
    registerSchema
} from '~api/v1/auth/authSchema';
import authController from '~api/v1/auth/authController';

const router = createPrefixedRouter(Router(), '/auth');

router.post(
    '/register',
    validateBodyMiddleware(registerSchema),
    authController.register
);

router.post(
    '/login',
    validateBodyMiddleware(loginSchema),
    authController.login
);

export default router;
