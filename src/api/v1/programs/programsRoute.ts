import {
    Router
} from 'express';
import programsController from '~api/v1/programs/programsController';
import { authMiddleware } from '~api/common/middlewares/authMiddleware';
import { roleGuardMiddleware } from '~api/common/middlewares/roleGuardMiddleware';
import { USER_ROLE } from '~utils/enums';
import validateBodyMiddleware from '~api/common/middlewares/validateBodyMiddleware';
import { updateProgramExercisesSchema } from '~api/v1/programs/programSchema';
import { createPrefixedRouter } from '~api/common/utils';

const router = createPrefixedRouter(Router(), '/programs');

router.get(
    '/',
    authMiddleware,
    programsController.getAllPrograms
);

router.put(
    '/:programId/add-exercises',
    authMiddleware,
    roleGuardMiddleware(USER_ROLE.ADMIN),
    validateBodyMiddleware(updateProgramExercisesSchema),
    programsController.bulkAddExercisesByProgramId
);

export default router;
