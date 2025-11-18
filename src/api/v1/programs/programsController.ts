import type {
    Request,
    NextFunction
} from 'express';

import programsService from '~api/v1/programs/programsService';
import type {
    IHttpPagedResponseBody, THttpResponseFunction
} from '~types/http';
import type { TUpdateProgramExercisesSchema } from '~api/v1/programs/programSchema';
import type { IExerciseModel } from '~db/models/exerciseModel';
import type { TPagedQueryObject } from '~utils/pagedQuery';
import type { IProgramModel } from '~db/models/programModel';
import { getSuccessResponseBody } from '~api/common/utils';

async function getAllPrograms(
    req: Request<{}, null, null, TPagedQueryObject>,
    res: THttpResponseFunction<IHttpPagedResponseBody<IProgramModel[]>>,
    next: NextFunction
) {
    try {
        const data = await programsService.getPagedAllPrograms(req.query);

        res.json(getSuccessResponseBody({
            data,
            message: 'LIST_OF_PROGRAMS'
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

async function bulkAddExercisesByProgramId(
    req: Request<{ programId: string }, null, TUpdateProgramExercisesSchema>,
    res: THttpResponseFunction<IExerciseModel[]>,
    next: NextFunction
) {
    try {
        const data = await programsService.bulkAddExercisesByProgramId(
            req.body.exercises,
            Number(req.params.programId)
        );

        res.json(getSuccessResponseBody({
            message: 'EXERCISES_ADDED_TO_PROGRAM',
            data
        }));
    } catch (err: unknown) {
        return next(err);
    }
}

export default {
    getAllPrograms,
    bulkAddExercisesByProgramId
};
