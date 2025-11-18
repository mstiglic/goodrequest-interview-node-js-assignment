import type { Response } from 'express';

export interface IHttpPagedResponseBody<D = unknown> {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    nextPageSearchParam: string | null;
    prevPageSearchParam: string | null;
    data: D
}

export interface IHttpSuccessResponseBody<T = unknown> {
    success: true;
    message: string;
    data: T;
}

export interface IHttpErrorResponseBody {
    success: false;
    message: string;
    errors?: unknown;
    statusCode: number;
}

export type THttpResponseFunction<
    ResBody = any,
    Locals extends Record<string, any> = Record<string, any>
> = Response<IHttpSuccessResponseBody<ResBody>, Locals>
