import type {
    NextFunction,
    Request,
    Response
} from 'express';
import { LOCALES } from '~configs/locales';
import { translate } from '~configs/locales';

export default function localizationMiddleware(req: Request, res: Response, next: NextFunction) {
    const langHeader = req.headers?.['language'] as string | undefined;
    const lang: LOCALES = langHeader && ['en', 'sk'].includes(langHeader.toLowerCase())
        ? (langHeader.toLowerCase() as LOCALES)
        : LOCALES.EN;

    req.lang = lang;
    req.t = (key: string) => translate(key, lang);

    // Translate "message" in all responses
    const originalJson = res.json.bind(res);
    res.json = (body: Record<string, unknown>) => {
        if ('message' in body && typeof body.message === 'string') {
            body.message = req.t(body.message);
        }
        return originalJson(body);
    };

    next();
}
