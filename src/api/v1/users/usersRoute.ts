import { Router } from 'express';
import { createPrefixedRouter } from '~api/common/utils';
import usersController from '~api/v1/users/usersController';
import { authMiddleware } from '~api/common/middlewares/authMiddleware';
import { roleGuardMiddleware } from '~api/common/middlewares/roleGuardMiddleware';
import { USER_ROLE } from '~utils/enums';
import validateBodyMiddleware from '~api/common/middlewares/validateBodyMiddleware';
import { partialUpdateUserSchema } from '~api/v1/users/usersSchema';

const router = createPrefixedRouter(Router(), '/users');

router.get(
    '/',
    authMiddleware,
    usersController.getAllUsers
);

router.get(
    '/profile/:userId',
    authMiddleware,
    roleGuardMiddleware(USER_ROLE.ADMIN),
    usersController.getUserById
);

router.get(
    '/profile',
    authMiddleware,
    usersController.getUserProfile
);

router.patch(
    '/profile/:userId',
    authMiddleware,
    roleGuardMiddleware(USER_ROLE.ADMIN),
    validateBodyMiddleware(partialUpdateUserSchema),
    usersController.partialUpdateUser(USER_ROLE.ADMIN)
);

router.patch(
    '/profile',
    authMiddleware,
    validateBodyMiddleware(partialUpdateUserSchema),
    usersController.partialUpdateUser(),
);

export default router;
