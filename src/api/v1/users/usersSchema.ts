import { z as zod } from 'zod';
import { USER_ROLE } from '~utils/enums';

export const partialUpdateUserSchema = zod.object({
    name: zod.string().max(100).optional(),
    surname: zod.string().max(100).optional(),
    nickName: zod.string().max(100).optional(),
    age: zod.int().positive().min(13).optional(),
    role: zod.enum(Object.values(USER_ROLE)).optional(),
});

export type TPartialUpdateUserSchema = zod.infer<typeof partialUpdateUserSchema>;

