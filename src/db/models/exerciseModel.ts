import type {
    Sequelize, Model
} from 'sequelize';
import { DataTypes } from 'sequelize';

import { EXERCISE_DIFFICULTY } from '~utils/enums';
import type { IProgramModel } from './programModel';

export interface IExerciseModel extends Model {
	id: number
	difficulty: EXERCISE_DIFFICULTY
	name: string
	program: IProgramModel
}

export default function defineExerciseModel(sequelize: Sequelize, modelName: string) {
    const ExerciseModelCtor = sequelize.define<IExerciseModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            difficulty: {
                type: DataTypes.ENUM(...Object.values(EXERCISE_DIFFICULTY))
            },
            name: {
                type: DataTypes.STRING(200),
            }
        },
        {
            paranoid: true,
            timestamps: true,
            tableName: 'exercises'
        }
    );

    ExerciseModelCtor.associate = (models) => {
        ExerciseModelCtor.belongsTo(models.Program, {
            foreignKey: {
                name: 'programID',
                allowNull: false
            },
        });
        ExerciseModelCtor.hasMany(models.UserExercise, {
            foreignKey: {
                name: 'exerciseID',
                allowNull: false,
            },
            as: 'userExercises'
        });
    };

    return ExerciseModelCtor;
};
