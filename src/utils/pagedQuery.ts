import type {
    Model, ModelStatic, WhereAttributeHash
} from 'sequelize';
import { Op } from 'sequelize';
import {
    getPagination, type IPaginationParams
} from '~utils/pagination';

export type TPagedQueryObject<Attr extends Record<string, unknown> = Record<string, any>>
    = IPaginationParams & {fullTextSearch?: string} & Attr

export interface IPagedQueryOptions<M extends Model> {
    where: Record<string, unknown>;
    limit: number;
    offset: number;
    page: number;
    nextPageSearchParam: string | null;
    prevPageSearchParam: string | null;
    model: ModelStatic<M>;
    totalCount: number;
    totalPages: number;
}

export async function buildPagedQuery<M extends Model>(
    model: ModelStatic<M>,
    query: TPagedQueryObject,
    filters?: Record<string, unknown>,
    fullTextSearchKey?: string,
): Promise<IPagedQueryOptions<M>> {
    const where: WhereAttributeHash = {};

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            where[key] = value;
        });
    }

    if (query.fullTextSearch && fullTextSearchKey) {
        where[fullTextSearchKey] = { [Op.iLike]: `%${query.fullTextSearch}%` };
    }

    const totalCount = await model.count({ where });
    const pagination = getPagination(query, totalCount);

    const buildQueryString = (pageNum: number) => {
        return '?' + new URLSearchParams({
            ...query,
            page: pageNum.toString(),
            limit: pagination.limit.toString(),
        }).toString();
    };

    const isFirsPage = !pagination.prevPage && !pagination.nextPage;

    return {
        where,
        limit: pagination.limit,
        offset: pagination.offset,
        page: pagination.page,
        nextPageSearchParam: isFirsPage
            ? buildQueryString(2)
            : (pagination.nextPage ? buildQueryString(pagination.nextPage) : null),
        prevPageSearchParam: pagination.prevPage ? buildQueryString(pagination.prevPage) : null,
        model,
        totalCount,
        totalPages: Math.ceil(totalCount / pagination.limit),
    };
}
