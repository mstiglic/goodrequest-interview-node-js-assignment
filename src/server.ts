import http from 'http';
import { ENV_CONFIG } from '~lib/env';
import { loggerCli } from '~lib/logger';
import app from '~lib/app';
import {
    initSequelize,
    verifySequelizeModels
} from '~lib/init';

const httpServer = http.createServer(app);

verifySequelizeModels();
initSequelize();

httpServer.listen(ENV_CONFIG.PORT).on(
    'listening',
    () => {
        loggerCli.info(`App is running in "${ENV_CONFIG.MODE}" mode`);
        loggerCli.info(`Server is running on http://127.0.0.1:${ENV_CONFIG.PORT}`);
        loggerCli.info(
            `Api server is running on http://127.0.0.1:${ENV_CONFIG.PORT}/${ENV_CONFIG.API_PREFIX}`
        );
    }
);

export default httpServer;
