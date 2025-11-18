import type { Router } from 'express';
import exercisesRoute from '~api/v1/exercises/exercisesRoute';
import programsRoute from '~api/v1/programs/programsRoute';
import authRoute from '~api/v1/auth/authRoute';
import usersRoute from '~api/v1/users/usersRoute';
import userExercisesRoute from '~api/v1/userExercises/userExercisesRoute';

export const routes: Record<`v${number}`, Router[]> = {
    v1: [
        exercisesRoute,
        programsRoute,
        authRoute,
        usersRoute,
        userExercisesRoute
    ],
};
