import { loggerCli } from '~lib/logger';
import type { TEnv } from '~configs/envConfig';
import envSchema from '~configs/envConfig';
import { z as zod } from 'zod';

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    loggerCli.error(`Invalid environment variables: ${JSON.stringify(zod.treeifyError(parsedEnv.error), null, 2)}`);
    process.exit(1);
}

export const ENV_CONFIG = parsedEnv.data as TEnv;
