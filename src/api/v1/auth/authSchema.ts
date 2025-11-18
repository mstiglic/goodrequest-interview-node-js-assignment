import { z as zod } from 'zod';
import { USER_ROLE } from '~utils/enums';

export const registerSchema = zod.object({
    name: zod.string().max(100),
    surname: zod.string().max(100),
    nickName: zod.string().max(100).optional(),
    email: zod.email(),
    age: zod.int().positive().min(13),
    password: zod
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(128, 'Password is too long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
    role: zod.enum(Object.values(USER_ROLE)),
});

export const loginSchema = zod.object({
    email: zod.email(),
    password: zod.string(),
});

export type TRegisterSchema = zod.infer<typeof registerSchema>;
export type TLoginSchema = zod.infer<typeof loginSchema>;
