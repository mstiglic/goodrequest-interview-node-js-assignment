import 'express';
import type { IUserModel } from '~db/models/userModel';

declare global {
    namespace Express {
        interface User extends IUserModel {}
        interface Request {
            lang: Language; // current request language
            t: (key: string) => string; // translation function
        }
    }
}
