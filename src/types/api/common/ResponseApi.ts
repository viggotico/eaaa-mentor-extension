interface ResponseApiMetaPaginationOffset {
    start: number;
    limit: number;
    total: number;
}

interface ResponseApiMetaPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface ResponseApiMeta {
    pagination?: ResponseApiMetaPagination | ResponseApiMetaPaginationOffset;
}

export interface ResponseApi<T> {
    data: T;
    meta: ResponseApiMeta;
}