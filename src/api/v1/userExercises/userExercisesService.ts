import {
    models, sequelize
} from '~db/sequelize';
import type { TCompleteExerciseSchema } from '~api/v1/userExercises/userExercisesSchema';
import { NotFoundException } from '~lib/httpException';

async function completeExerciseById(
    completeData: TCompleteExerciseSchema,
    userId: number
) {
    return await models.UserExercise.create(
        {
            completedAt: Date.now(),
            duration: completeData.duration,
            exerciseID: completeData.exerciseId,
            userID: userId,
        },
    );
}

async function deleteCompletedExerciseById(
    userExerciseId: number,
    userId: number
) {
    return await sequelize.transaction(async (transaction) => {
        const affectedRecords = await models.UserExercise.destroy(
            {
                where: {
                    id: userExerciseId,
                    userID: userId
                },
                transaction,
            },
        );

        if (affectedRecords === 0) {
            throw new NotFoundException('USER_EXERCISE_NOT_FOUND');
        }

        return models.UserExercise.findAll(
            {
                where: {
                    userID: userId,
                },
                transaction
            }
        );

    });
}

export default {
    completeExerciseById,
    deleteCompletedExerciseById,
};
