export interface ActionError {
    error: string;
    message: string;
};

export enum OrderBy {
    ID = 'id',
    NAME = 'name',
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
};

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
};

export interface SearchQuery {
    search?: string;
}

export interface PaginationQuery {
    per_page?: number;
    page?: number;
}

export interface OrderQuery {
    order_by?: OrderBy;
    order?: Order;
};

export interface PaginationResponseData {
    total_pages: number;
    per_page: number;
    page: number;
    total: number;
}