import type {
    NextFunction,
    Request
} from 'express';
import exercisesService from '~api/v1/exercises/exercisesService';
import type { TCreateExerciseSchema } from '~api/v1/exercises/exercisesSchema';
import type {
    IHttpPagedResponseBody, THttpResponseFunction
} from '~types/http';
import type { IExerciseModel } from '~db/models/exerciseModel';



import type { TPagedQueryObject } from '~utils/pagedQuery';
import { getSuccessResponseBody } from '~api/common/utils';

async function getAllExercises(
    req: Request<{}, null, null, TPagedQueryObject<{programID?: string}>>,
    res: THttpResponseFunction<IHttpPagedResponseBody<IExerciseModel[]>>,
    next: NextFunction
) {
    try {
        const data = await exercisesService.getPagedAllExercises(req.query);

        res.json(getSuccessResponseBody({
            message: 'LIST_OF_EXERCISES',
            data,
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function createExercise(
    req: Request<{}, TCreateExerciseSchema>,
    res: THttpResponseFunction<IExerciseModel>,
    next: NextFunction
) {
    try {
        const data = await exercisesService.createExercise(req.body);

        res.json(getSuccessResponseBody({
            message: 'CREAATED_EXERCISE',
            data
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function partialUpdateExercise(
    req: Request<{ exerciseId: string }, TCreateExerciseSchema>,
    res: THttpResponseFunction<IExerciseModel | null>,
    next: NextFunction
) {
    try {
        const data = await exercisesService.partialUpdateExercise(req.body, Number(req.params.exerciseId));

        res.json(getSuccessResponseBody({
            message: 'UPDATED_EXERCISE',
            data
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function softDeleteExerciseById(
    req: Request<{ exerciseId: string }>,
    res: THttpResponseFunction<{deletedId: number}>,
    next: NextFunction
) {
    try {
        const exerciseId = Number(req.params.exerciseId);
        await exercisesService.softDeleteExerciseById(exerciseId);

        res.json(getSuccessResponseBody({
            message: 'DELETED_EXERCISE',
            data: {
                deletedId: exerciseId
            }
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

export default {
    getAllExercises,
    createExercise,
    partialUpdateExercise,
    softDeleteExerciseById,
};
