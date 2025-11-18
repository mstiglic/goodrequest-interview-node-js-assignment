import {
    models, sequelize
} from '~db/sequelize';
import type { IProgramModel } from '~db/models/programModel';
import type { IExerciseModel } from '~db/models/exerciseModel';
import { Op } from 'sequelize';
import type { TPagedQueryObject } from '~utils/pagedQuery';
import { buildPagedQuery } from '~utils/pagedQuery';
import type { IHttpPagedResponseBody } from '~types/http';

async function getPagedAllPrograms(
    query: TPagedQueryObject
): Promise<IHttpPagedResponseBody<IProgramModel[]>> {
    const {
        limit,
        offset,
        page,
        prevPageSearchParam,
        nextPageSearchParam,
        model,
        where,
        totalCount,
        totalPages
    } = await buildPagedQuery(
        models.Program,
        query,
        undefined,
        'name'
    );

    const result = await model.findAll({
        offset,
        limit,
        where,
        order: [['id', 'ASC']],
    });

    return {
        limit,
        page,
        prevPageSearchParam,
        nextPageSearchParam,
        data: result,
        totalCount: totalCount,
        totalPages
    };
}

async function bulkAddExercisesByProgramId(exercisesId: number[], programID:number): Promise<IExerciseModel[]> {
    return await sequelize.transaction(async (transaction) => {
        await models.Exercise.update(
            { programID },
            {
                where: {
                    id: {
                        [Op.in]: exercisesId
                    }
                },
                transaction
            }
        );

        return await models.Exercise.findAll({
            where: { programID },
            transaction
        });
    });
}

export default {
    getPagedAllPrograms,
    bulkAddExercisesByProgramId
};
