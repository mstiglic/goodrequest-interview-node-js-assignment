export interface IPaginationParams {
    page?: number;
    limit?: number;
}

export interface IPaginationOptions {
    offset: number;
    limit: number;
    page: number;
    nextPage: number | null;
    prevPage: number | null;
}

export function getPagination(
    query: IPaginationParams,
    totalCount?: number,

): IPaginationOptions {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const offset = (page - 1) * limit;

    let totalPages = 0;
    if (totalCount !== undefined) {
        totalPages = Math.ceil(totalCount / limit);
    }

    const nextPage = totalCount !== undefined && page < totalPages ? (page + 1) : null;
    const prevPage = totalCount !== undefined && page > 1 ? (page - 1) : null;

    return {
        offset,
        limit,
        nextPage,
        prevPage,
        page
    };
}
