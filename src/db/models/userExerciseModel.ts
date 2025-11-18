import type {
    Sequelize, Model
} from 'sequelize';
import { DataTypes } from 'sequelize';

import type { IExerciseModel } from '~db/models/exerciseModel';
import type { IUserModel } from '~db/models/userModel';

export interface IUserExerciseModel extends Model {
    id: number;
    user: IUserModel;
    exercises: IExerciseModel[];
    duration: number;
    completedAt: number;
}

export default function defineUserExerciseModel(sequelize: Sequelize, modelName: string) {
    const UserExerciseModelCtor = sequelize.define<IUserExerciseModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            duration: {
                type: DataTypes.BIGINT,
            },
            completedAt: {
                type: DataTypes.DATE,
            }
        },
        {
            paranoid: true,
            timestamps: true,
            tableName: 'user_exercises'
        }
    );

    UserExerciseModelCtor.associate = (models) => {
        UserExerciseModelCtor.belongsTo(models.Exercise, {
            foreignKey: {
                name: 'exerciseID',
                allowNull: false,
            },
            as: 'exercise'
        });
        UserExerciseModelCtor.belongsTo(models.User, {
            foreignKey: {
                name: 'userID',
                allowNull: false,
            },
            as: 'user'
        });
    };

    return UserExerciseModelCtor;
};
