import type { CorsOptions } from 'cors';

export const SERVER_CORS_OPTIONS: CorsOptions = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'DELETE',
        'PATH',
        'PUT'
    ],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
    ],
};

export const SERVER_MORGAN_FORMAT = 'common';
export const SERVER_ENABLE_PROXY = 'trust proxy';
