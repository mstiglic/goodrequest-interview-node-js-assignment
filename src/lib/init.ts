import path from 'node:path';
import fs from 'fs';
import {
    models,
    sequelize
} from '~db/sequelize';
import { loggerCli } from '~lib/logger';

export function verifySequelizeModels() {
    const modelsDir = path.join(
        process.cwd(),
        'src',
        'db',
        'models'
    );

    const modelsFiles = fs.readdirSync(modelsDir);

    if (Object.keys(models).length !== (modelsFiles.length)) {
        loggerCli.error('You probably forgot import database model!');

        return;
    }

    Object.values(models).forEach((value: any) => {
        if (value.associate) {
            value.associate(models);
        }
    });
}

export function initSequelize() {
    try {
        void sequelize.sync();
    } catch (err: unknown) {
        loggerCli.error('Sequelize sync error');
        loggerCli.debug((err as Error)?.message);
    }
}
