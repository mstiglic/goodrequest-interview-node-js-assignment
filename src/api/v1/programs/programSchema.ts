import { z as zod } from 'zod';

export const updateProgramExercisesSchema = zod.object({
    exercises: zod.array(zod.int().positive()),
});

export type TUpdateProgramExercisesSchema = zod.infer<typeof updateProgramExercisesSchema>;
