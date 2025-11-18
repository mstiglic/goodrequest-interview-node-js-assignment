import {
    models, sequelize
} from '~db/sequelize';
import type { IUserModel } from '~db/models/userModel';
import { USER_ROLE } from '~utils/enums';
import type { TPartialUpdateUserSchema } from '~api/v1/users/usersSchema';

async function getAllUsers(role: USER_ROLE): Promise<IUserModel[]> {
    const attributesByRole: Partial<Record<USER_ROLE, string[]>> = {
        [USER_ROLE.USER]: ['id', 'nickName']
    };
    return await models.User.findAll({
        attributes: attributesByRole?.[role],
    });
}

async function getUserById(userId: number, role: USER_ROLE): Promise<IUserModel | null> {
    const userAttributesByRole: Partial<Record<USER_ROLE, string[]>> = {
        [USER_ROLE.USER]: [
            'name',
            'surname',
            'age',
            'nickName',
        ]
    };
    const userExercisesAttributesByRole: Partial<Record<USER_ROLE, string[]>> = {
        [USER_ROLE.USER]: ['duration', 'completedAt']
    };

    return await models.User.findByPk(userId, {
        attributes: userAttributesByRole?.[role],
        include: {
            model: models.UserExercise,
            as: 'userExercises',
            attributes: userExercisesAttributesByRole?.[role],
        }
    });
}

async function partialUpdateUserById(user: TPartialUpdateUserSchema, userId: number) {
    return await sequelize.transaction(async (transaction) => {
        await models.User.update(
            user,
            {
                where: { id: userId },
                transaction
            }
        );

        return models.User.findByPk(userId, { transaction });
    });
}

export default {
    getAllUsers,
    getUserById,
    partialUpdateUserById
};
