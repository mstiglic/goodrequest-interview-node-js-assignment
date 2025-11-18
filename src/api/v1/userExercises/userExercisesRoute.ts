import { createPrefixedRouter } from '~api/common/utils';
import { Router } from 'express';
import { authMiddleware } from '~api/common/middlewares/authMiddleware';
import userExercisesController from '~api/v1/userExercises/userExercisesController';
import validateBodyMiddleware from '~api/common/middlewares/validateBodyMiddleware';
import { completeExerciseSchema } from '~api/v1/userExercises/userExercisesSchema';

const router = createPrefixedRouter(Router(), '/user-exercises');

router.post(
    '/complete',
    authMiddleware,
    validateBodyMiddleware(completeExerciseSchema),
    userExercisesController.completeExerciseById
);

router.delete(
    '/delete/:userExerciseId',
    authMiddleware,
    userExercisesController.deleteCompletedExerciseById
);


export default router;
