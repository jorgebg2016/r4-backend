import { RequestHandler, Request, Response } from 'express';
import { Category, CategoryInstance } from '../database/models/Category';
import { 
    CategoryRequestParams, 
    CategoryRequestBody,
    CategorySerialized,
    CategoriesDataSerialized,
    CategoryQuery
} from '../types/CategoryTypes';

import { ActionError, PaginationQuery } from '../types/CommonTypes';
import paginate from '../helpers/Paginator';

/**
 * Get all categories.
 */
const getAllCategories: RequestHandler<{}, CategoriesDataSerialized, {}, CategoryQuery, {}> 
    = async (
        request: Request<{}, CategoriesDataSerialized, {}, CategoryQuery, {}>, 
        response: Response<CategoriesDataSerialized>
) => {

    const query: CategoryQuery = request.query;

    let queryList: any[] = [];

    if(query.search && typeof query.search === "string") queryList.push({ name: `%${query.search}%` });

    if(query.search && typeof query.search === "number") queryList.push({ id: query.search });

    let categories: CategoryInstance[] = await Category.findAll({
        where: queryList,
    });

    let serializedCategories: CategorySerialized[] = [];

    categories.forEach((category: CategoryInstance) => {

        serializedCategories.push({
            id: category.id,
            name: category.name,
            created_at: category.createdAt,
            updated_at: category.updatedAt,
        });
    });

    let responseBody: CategoriesDataSerialized = {
        data: serializedCategories
    };

    if(query.per_page) {

        let paginatedCategories = paginate(serializedCategories, query.per_page);

        let page: number = 1;

        responseBody.pagination = {
            per_page: query.per_page,
            page: page,
            pages: serializedCategories.length,
            total: categories.length
        };

        responseBody.data = paginatedCategories[page - 1];

        if(query.page) {

            responseBody.pagination.page = query.per_page;

            responseBody.data = paginatedCategories[query.page - 1]
        }
    }

    return response.status(200).json(responseBody);
};


/**
 * Get category by id.
 */
const getCategoryByID: RequestHandler<CategoryRequestParams, CategorySerialized|ActionError> 
    = async (
        request: Request<CategoryRequestParams>, 
        response: Response<CategorySerialized|ActionError>
) => {

    let categoryID: number = request.params.category_id;

    let category: CategoryInstance|null = await Category.findByPk(categoryID);

    if(!category) return response.status(404).json({
        error: 'Not Found Error.',
        message: `Category with id ${categoryID} was not found.`
    });

    let categorySerialized: CategorySerialized = {
        id: category.id,
        name: category.name,
        created_at: category.createdAt,
        updated_at: category.updatedAt,
    };

    return response.status(200).json(categorySerialized);
};

/**
 * Store a new category. 
 */
const storeNewCategory: RequestHandler<{}, CategorySerialized|ActionError, CategoryRequestBody, {}> 
    = async (
        request: Request<{}, CategorySerialized|ActionError, CategoryRequestBody, {}>,
        response: Response<CategorySerialized|ActionError>
) => {

    let payload: CategoryRequestBody = request.body;

    let storedCategory: CategoryInstance|null = await Category.findOne({
        where: {
            name: payload.name
        }
    });

    if(storedCategory) return response.status(409).json({
        error: 'Conflict Error.',
        message: `There is already a category named ${payload.name} stored.`
    });

    let newCategory: CategoryInstance = await Category.create({
        name: payload.name,
    });

    let newSerializedCategory: CategorySerialized = {
        id: newCategory.id,
        name: newCategory.name,
        created_at: newCategory.createdAt,
        updated_at: newCategory.updatedAt
    };

    return response.status(200).json(newSerializedCategory);
};

const updateCategoryByID: RequestHandler<CategoryRequestParams, CategorySerialized|ActionError> 
= async (
    request: Request<CategoryRequestParams, CategorySerialized|ActionError, CategoryRequestBody>, 
    response: Response<CategorySerialized|ActionError>
) => {

    let categoryID: number = request.params.category_id;

    let payload: CategoryRequestBody = request.body;

    let category: CategoryInstance|null = await Category.findByPk(categoryID);

    if(!category) return response.status(404).json({
        error: 'Not Found Error.',
        message: `Category with id ${categoryID} was not found.`
    });

    let storedCategory: CategoryInstance|null = await Category.findOne({
        where: {
            name: payload.name
        }
    });

    if(storedCategory) return response.status(409).json({
        error: 'Conflict Error.',
        message: `There is already a category named ${payload.name} stored.`
    });

    category.update({
        name: payload.name
    });

};


export {
    getAllCategories,
    getCategoryByID,
    storeNewCategory,
    updateCategoryByID
};