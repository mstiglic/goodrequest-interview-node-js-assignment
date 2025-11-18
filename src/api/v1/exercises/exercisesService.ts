import {
    models, sequelize
} from '~db/sequelize';
import type { IExerciseModel } from '~db/models/exerciseModel';
import type { TCreateExerciseSchema } from '~api/v1/exercises/exercisesSchema';
import type { IHttpPagedResponseBody } from '~types/http';
import type { TPagedQueryObject } from '~utils/pagedQuery';
import { buildPagedQuery } from '~utils/pagedQuery';

async function getPagedAllExercises(
    query: TPagedQueryObject<{programID?: string}>
): Promise<IHttpPagedResponseBody<IExerciseModel[]>> {
    const filters: Record<string, unknown> = {};

    if (query.programID) {
        filters['programID'] = Number(query.programID);
    }
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
        models.Exercise,
        query,
        filters,
        'name'
    );

    const result = await model.findAll({
        offset,
        limit,
        where,
        order: [['id', 'ASC']],
        include: [{
            model: models.Program
        }]
    });

    return {
        limit,
        page,
        prevPageSearchParam,
        nextPageSearchParam,
        data: result,
        totalCount,
        totalPages
    };
}

async function createExercise(exercise: TCreateExerciseSchema): Promise<IExerciseModel> {
    return await models.Exercise.create({
        ...exercise,
        programID: exercise.programId
    });
}

async function partialUpdateExercise(
    exercise: TCreateExerciseSchema,
    exerciseId: number
): Promise<IExerciseModel | null> {
    return await sequelize.transaction(async (transaction) => {
        await models.Exercise.update(
            exercise,
            {
                where: { id: exerciseId },
                transaction
            },
        );

        return models.Exercise.findByPk(exerciseId, { transaction });
    });

}

async function softDeleteExerciseById(exerciseId: number) {
    await models.Exercise.destroy({
        where: { id: exerciseId }
    });
}

export default {
    getPagedAllExercises,
    createExercise,
    partialUpdateExercise,
    softDeleteExerciseById,
};
