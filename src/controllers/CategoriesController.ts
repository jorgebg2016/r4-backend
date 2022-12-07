import { RequestHandler, Request, Response } from 'express';
import { Category, CategoryInstance } from '../database/models/Category';
import { 
    CategoryRequestParams, 
    CategoryRequestBody,
    CategorySerialized,
    CategoriesDataSerialized,
    CategoryQuery,
    DeleteCategorySuccess,
} from '../types/CategoryTypes';

import { ActionError, Order, OrderBy } from '../types/CommonTypes';
import paginate from '../helpers/Paginator';
import { Op, OrderItem, WhereOptions } from 'sequelize';
import isNumeric from '../helpers/NumericChecker';
import { CategoryAttributes } from '../database/models/Category';

/**
 * Get all categories.
 */
const getAllCategories: RequestHandler<{}, CategoriesDataSerialized, {}, CategoryQuery, {}> 
    = async (
        request: Request<{}, CategoriesDataSerialized, {}, CategoryQuery, {}>, 
        response: Response<CategoriesDataSerialized>
) => {

    const query: CategoryQuery = request.query;

    let queryList: WhereOptions<CategoryAttributes>|undefined = [];

    let orderByList: OrderItem = [OrderBy.ID, Order.ASC];

    if(query.search) 
        (!isNumeric(query.search))
            ? queryList.push({ name: { [Op.like]: `%${query.search}` } })
            : queryList.push({ id: query.search });
    
    if(query.order_by && Object.values(OrderBy).includes(query.order_by)) 
        orderByList[0] = query.order_by;

    if(query.order && Object.values(Order).includes(query.order)) 
        orderByList[1] = query.order;

    let categories: CategoryInstance[] = await Category.findAll({
        where: queryList,
        order: [orderByList]
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
            per_page: Number(query.per_page),
            page: page,
            total_pages: paginatedCategories.length,
            total: categories.length
        };

        responseBody.data = paginatedCategories[page - 1];

        if(query.page) {

            responseBody.pagination.page = Number(query.page);

            responseBody.data = paginatedCategories[query.page - 1];
        };
    };

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

    category.save();

    let updatedSerializedCategory: CategorySerialized = {
        id: category.id,
        name: category.name,
        created_at: category.createdAt,
        updated_at: category.updatedAt
    };

    return response.status(200).json(updatedSerializedCategory);
};

/**
 * Delete category by id.
 */
const deleteCategoryByID: RequestHandler<CategoryRequestParams, DeleteCategorySuccess|ActionError> 
    = async (
        request: Request<CategoryRequestParams>, 
        response: Response<DeleteCategorySuccess|ActionError>
) => {

    let categoryID: number = request.params.category_id;

    let category: CategoryInstance|null = await Category.findByPk(categoryID);

    if(!category) return response.status(404).json({
        error: 'Not Found Error.',
        message: `Category with id ${categoryID} was not found.`
    });

    category.destroy();

    return response.status(200).json({
        message: 'Category deleted with success!',
        category_id: category.id
    });
};


export {
    getAllCategories,
    getCategoryByID,
    storeNewCategory,
    updateCategoryByID,
    deleteCategoryByID
};