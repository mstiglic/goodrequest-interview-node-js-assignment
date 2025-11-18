import { z as zod } from 'zod';
import { EXERCISE_DIFFICULTY } from '~utils/enums';

export const createExerciseSchema = zod.object({
    name: zod.string().max(100).optional(),
    difficulty: zod.enum(Object.values(EXERCISE_DIFFICULTY)),
    programId: zod.int().positive()
});

export type TCreateExerciseSchema = zod.infer<typeof createExerciseSchema>;
