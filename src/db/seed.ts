import {
    models,
    sequelize
} from '~db/sequelize';
import { EXERCISE_DIFFICULTY } from '~utils/enums';
import { verifySequelizeModels } from '~lib/init';

const {
    Exercise,
    Program,
} = models;

const seedDB = async () => {
    verifySequelizeModels();
    await sequelize.sync({
        force: true,
    });

    await Program.bulkCreate([
        {
            name: 'Program 1'
        },
        {
            name: 'Program 2'
        },
        {
            name: 'Program 3'
        }
    ]);

    await Exercise.bulkCreate([
        {
            name: 'Exercise 1',
            difficulty: EXERCISE_DIFFICULTY.EASY,
            programID: 1
        },
        {
            name: 'Exercise 2',
            difficulty: EXERCISE_DIFFICULTY.EASY,
            programID: 2
        },
        {
            name: 'Exercise 3',
            difficulty: EXERCISE_DIFFICULTY.MEDIUM,
            programID: 1
        },
        {
            name: 'Exercise 4',
            difficulty: EXERCISE_DIFFICULTY.MEDIUM,
            programID: 2
        },
        {
            name: 'Exercise 5',
            difficulty: EXERCISE_DIFFICULTY.HARD,
            programID: 1
        },
        {
            name: 'Exercise 6',
            difficulty: EXERCISE_DIFFICULTY.HARD,
            programID: 2
        }
    ]);
};

seedDB().then(() => {
    console.log('DB seed done');
    process.exit(0);
}).catch((err) => {
    console.error('error in seed, check your data and model \n \n', err);
    process.exit(1);
});
