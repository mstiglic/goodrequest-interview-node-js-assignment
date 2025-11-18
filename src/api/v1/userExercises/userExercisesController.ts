import type {
    NextFunction,
    Request
} from 'express';
import type { TCompleteExerciseSchema } from '~api/v1/userExercises/userExercisesSchema';
import userExercisesService from '~api/v1/userExercises/userExercisesService';
import type {
    THttpResponseFunction
} from '~types/http';
import type { IUserExerciseModel } from '~db/models/userExerciseModel';
import {
    getSuccessResponseBody, requireUser
} from '~api/common/utils';

async function completeExerciseById(
    req: Request<{}, null, TCompleteExerciseSchema>,
    res: THttpResponseFunction<IUserExerciseModel>,
    next: NextFunction
) {
    try {
        const loggedUser = requireUser(req);

        const data = await userExercisesService.completeExerciseById(
            req.body,
            loggedUser.id
        );

        res.json(getSuccessResponseBody({
            data,
            message: 'EXERCISE_COMPLETED_SUCCESSFULLY'
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function deleteCompletedExerciseById(
    req: Request<{userExerciseId: string}, null>,
    res: THttpResponseFunction<IUserExerciseModel[]>,
    next: NextFunction
) {
    try {
        const loggedUser = requireUser(req);

        const data = await userExercisesService.deleteCompletedExerciseById(
            Number(req.params.userExerciseId),
            loggedUser.id
        );

        res.json(getSuccessResponseBody({
            data,
            message: 'COMPLETED_EXERCISE_DELETED'
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

export default {
    completeExerciseById,
    deleteCompletedExerciseById
};
