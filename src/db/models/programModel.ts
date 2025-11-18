import type {
    Sequelize, Model
} from 'sequelize';
import { DataTypes } from 'sequelize';
import type { EXERCISE_DIFFICULTY } from '~utils/enums';
import type { IExerciseModel } from './exerciseModel';

export interface IProgramModel extends Model {
	id: number
	difficulty: EXERCISE_DIFFICULTY
	name: string
	exercises: IExerciseModel[]
}

export default function defineProgramModel(sequelize: Sequelize, modelName: string) {
    const ProgramModelCtor = sequelize.define<IProgramModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(200),
            }
        },
        {
            paranoid: true,
            timestamps: true,
            tableName: 'programs'
        }
    );

    ProgramModelCtor.associate = (models) => {
        ProgramModelCtor.hasMany(models.Exercise, {
            foreignKey: {
                name: 'programID',
                allowNull: false
            }
        });
    };

    return ProgramModelCtor;
};
