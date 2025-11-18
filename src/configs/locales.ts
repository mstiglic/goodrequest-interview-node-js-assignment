export enum LOCALES {
    EN = 'en',
    SK = 'sk'
}

export const messages: Record<LOCALES, Record<string, string>> = {
    sk: {
        PATH_NOT_FOUND: 'Požadovaná cesta neexistuje.',
        USER_CREATED: 'Používateľ bol úspešne vytvorený.',
        LIST_OF_PROGRAMS: 'Zoznam programov bol načítaný.',
        FORBIDDEN_ACCESS: 'Prístup je zakázaný.',
        USER_ALREADY_EXISTS: 'Používateľ s touto e-mailovou adresou už existuje.',
        INVALID_REQUEST_BODY: 'Neplatné údaje v požiadavke.',
        LIST_OF_EXERCISES: 'Zoznam cvikov bol načítaný.',
        USER_NOT_FOUND_WITH_EMAIL: 'Používateľ so zadaným e-mailom sa nenašiel.',
        SOMETHING_WENT_WRONG: 'Nastala neočakávaná chyba.',
        LIST_OF_USERS: 'Zoznam používateľov bol načítaný.',
        USER_EXERCISE_NOT_FOUND: 'Používateľský záznam o cvičení sa nenašiel.',
        INCORRECT_PASSWORD: 'Nesprávne heslo.',
        USER_NOT_FOUND: 'Používateľ sa nenašiel.',
        EXERCISES_ADDED_TO_PROGRAM: 'Cviky boli úspešne pridané do programu.',
        EXERCISE_COMPLETED_SUCCESSFULLY: 'Cvik bol úspešne označený ako splnený.',
        CREATED_EXERCISE: 'Cvik bol úspešne vytvorený.',
        USER_LOGGED_IN: 'Používateľ bol úspešne prihlásený.',
        UNAUTHORIZED_ACCESS: 'Neautorizovaný prístup.',
        USER_DETAIL: 'Detail používateľa bol načítaný.',
        COMPLETED_EXERCISE_DELETED: 'Označenie dokončeného cviku bolo odstránené.',
        UPDATED_EXERCISE: 'Cvik bol úspešne aktualizovaný.',
        USER_PROFILE: 'Používateľský profil bol načítaný.',
        DELETED_EXERCISE: 'Cvik bol úspešne odstránený.',
        USER_UPDATED: 'Používateľ bol úspešne aktualizovaný.'
    },
    en: {
        PATH_NOT_FOUND: 'The requested path does not exist.',
        USER_CREATED: 'User has been successfully created.',
        LIST_OF_PROGRAMS: 'Program list loaded successfully.',
        FORBIDDEN_ACCESS: 'Access is forbidden.',
        USER_ALREADY_EXISTS: 'A user with this email already exists.',
        INVALID_REQUEST_BODY: 'Invalid request body.',
        LIST_OF_EXERCISES: 'Exercise list loaded successfully.',
        USER_NOT_FOUND_WITH_EMAIL: 'No user found with the provided email.',
        SOMETHING_WENT_WRONG: 'Something went wrong.',
        LIST_OF_USERS: 'User list loaded successfully.',
        USER_EXERCISE_NOT_FOUND: 'User exercise record not found.',
        INCORRECT_PASSWORD: 'Incorrect password.',
        USER_NOT_FOUND: 'User not found.',
        EXERCISES_ADDED_TO_PROGRAM: 'Exercises successfully added to the program.',
        EXERCISE_COMPLETED_SUCCESSFULLY: 'Exercise completed successfully.',
        CREATED_EXERCISE: 'Exercise has been successfully created.',
        USER_LOGGED_IN: 'User logged in successfully.',
        UNAUTHORIZED_ACCESS: 'Unauthorized access.',
        USER_DETAIL: 'User detail loaded successfully.',
        COMPLETED_EXERCISE_DELETED: 'Completed exercise record has been deleted.',
        UPDATED_EXERCISE: 'Exercise has been successfully updated.',
        USER_PROFILE: 'User profile loaded successfully.',
        DELETED_EXERCISE: 'Exercise has been successfully deleted.',
        USER_UPDATED: 'User has been successfully updated.'
    }
};

export function translate(key: string, lang: LOCALES = LOCALES.EN): string {
    return messages[lang]?.[key] || messages[LOCALES.EN][key] || key;
}
