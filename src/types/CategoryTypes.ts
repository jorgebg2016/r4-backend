import { 
    PaginationResponseData,
    PaginationQuery,
    SearchQuery,
    OrderQuery
} from "./CommonTypes";

export interface CategoryRequestParams {
    category_id: number;
};

export interface CategorySerialized {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface CategoriesDataSerialized {
    pagination?: PaginationResponseData;
    data: CategorySerialized[]
};

export interface CategoryRequestBody {
    name: string;
};

export interface CategoryQuery extends PaginationQuery, SearchQuery, OrderQuery {};

export interface DeleteCategorySuccess {
    message: string;
    category_id: number;
};