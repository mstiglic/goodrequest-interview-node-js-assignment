import { z as zod } from 'zod';

export const completeExerciseSchema = zod.object({
    duration: zod.int().positive(),
    exerciseId: zod.int().positive()
});

export type TCompleteExerciseSchema = zod.infer<typeof completeExerciseSchema>;
