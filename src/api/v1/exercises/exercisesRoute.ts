import { createPrefixedRouter } from '~api/common/utils';
import { Router } from 'express';
import exercisesController from '~api/v1/exercises/exercisesController';
import { authMiddleware } from '~api/common/middlewares/authMiddleware';
import { roleGuardMiddleware } from '~api/common/middlewares/roleGuardMiddleware';
import { USER_ROLE } from '~utils/enums';
import {
    createExerciseSchema
} from '~api/v1/exercises/exercisesSchema';
import validateBodyMiddleware from '~api/common/middlewares/validateBodyMiddleware';


const router = createPrefixedRouter(Router(), '/exercises');

router.get(
    '/',
    authMiddleware,
    exercisesController.getAllExercises
);

router.post(
    '/',
    authMiddleware,
    roleGuardMiddleware(USER_ROLE.ADMIN),
    validateBodyMiddleware(createExerciseSchema),
    exercisesController.createExercise
);

router.patch(
    '/:exerciseId',
    authMiddleware,
    roleGuardMiddleware(USER_ROLE.ADMIN),
    exercisesController.partialUpdateExercise
);

router.delete(
    '/:exerciseId',
    authMiddleware,
    roleGuardMiddleware(USER_ROLE.ADMIN),
    exercisesController.softDeleteExerciseById
);

export default router;
