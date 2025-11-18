import { z as zod } from 'zod';

const envSchema = zod.object({
    API_PREFIX: zod.string().min(1, 'API_PREFIX is required'),
    DATABASE_URL: zod.url('DATABASE_URL must be a valid URL'),
    MODE: zod.enum(['dev', 'prod',]).default('dev'),
    PORT: zod.coerce.number().int().positive().default(8000),
    JWT_SECRET: zod.string().min(1, 'JWT_SECRET is required')
});

export type TEnv = zod.infer<typeof envSchema>;

export default envSchema;
