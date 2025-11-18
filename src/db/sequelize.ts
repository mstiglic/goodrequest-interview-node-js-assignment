import { Sequelize } from 'sequelize';
import defineProgramModel from '~db/models/programModel';
import defineExerciseModel from '~db/models/exerciseModel';
import defineUserModel from '~db/models/userModel';
import { ENV_CONFIG } from '~lib/env';
import defineUserExerciseModel from '~db/models/userExerciseModel';
import { loggerCli } from '~lib/logger';

const sequelize: Sequelize = new Sequelize(
    ENV_CONFIG.DATABASE_URL,
    {
        logging: true,
    }
);

sequelize.authenticate().catch((e: any) => loggerCli.error(`Unable to connect to the database${e}.`));

const Exercise = defineExerciseModel(sequelize, 'exercise');
const Program = defineProgramModel(sequelize, 'program');
const User = defineUserModel(sequelize, 'user');
const UserExercise = defineUserExerciseModel(sequelize, 'userExercises');

const models = {
    Exercise,
    Program,
    User,
    UserExercise
};

export type TSequelizeModels = typeof models

export {
    models,
    sequelize
};
