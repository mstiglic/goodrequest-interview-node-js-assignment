import type {
    Model, Sequelize
} from 'sequelize';
import { DataTypes } from 'sequelize';
import { USER_ROLE } from '~utils/enums';
import bcrypt from 'bcrypt';
import type { IUserExerciseModel } from '~db/models/userExerciseModel';

export interface IUserModel extends Model {
	id: number;
    name: string;
    surname: string;
    nickName: string;
    email: string;
    password: string;
    age: number;
    role: USER_ROLE;
    userExercises: IUserExerciseModel[];
}

export default function defineUserModel(sequelize: Sequelize, modelName: string) {
    const UserModelCtor = sequelize.define<IUserModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(100),
            },
            surname: {
                type: DataTypes.STRING(100),
            },
            nickName: {
                type: DataTypes.STRING(100),
            },
            email: {
                type: DataTypes.STRING(254),
                validate: { isEmail: true },
                unique: true,
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                validate: {
                    min: {
                        args: [18],
                        msg: 'User must be at least 13 years old'
                    }
                },
            },
            role: {
                type: DataTypes.ENUM(...Object.values(USER_ROLE))
            },
        },
        {
            paranoid: true,
            timestamps: true,
            tableName: 'users',
            hooks: {
                beforeCreate: async (user: IUserModel) => {
                    if (user.password) {
                        const saltRounds = 12;
                        user.password = await bcrypt.hash(user.password, saltRounds);
                    }
                },
                beforeUpdate: async (user: IUserModel) => {
                    if (user.changed('password')) {
                        const saltRounds = 12;
                        user.password = await bcrypt.hash(user.password, saltRounds);
                    }
                },
            },
        }
    );
    UserModelCtor.associate = (models) => {
        UserModelCtor.hasMany(models.UserExercise, {
            foreignKey: {
                name: 'userID',
                allowNull: false,
            },
            as: 'userExercises'
        });
    };

    return UserModelCtor;
};
