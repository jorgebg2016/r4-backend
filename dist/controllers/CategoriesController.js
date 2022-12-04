"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryByID = exports.storeNewCategory = exports.getCategoryByID = exports.getAllCategories = void 0;
const Category_1 = require("../database/models/Category");
const Paginator_1 = __importDefault(require("../helpers/Paginator"));
/**
 * Get all categories.
 */
const getAllCategories = async (request, response) => {
    const query = request.query;
    let queryList = [];
    if (query.search && typeof query.search === "string")
        queryList.push({ name: `%${query.search}%` });
    if (query.search && typeof query.search === "number")
        queryList.push({ id: query.search });
    let categories = await Category_1.Category.findAll({
        where: queryList,
    });
    let serializedCategories = [];
    categories.forEach((category) => {
        serializedCategories.push({
            id: category.id,
            name: category.name,
            created_at: category.createdAt,
            updated_at: category.updatedAt,
        });
    });
    let responseBody = {
        data: serializedCategories
    };
    if (query.per_page) {
        let paginatedCategories = (0, Paginator_1.default)(serializedCategories, query.per_page);
        let page = 1;
        responseBody.pagination = {
            per_page: query.per_page,
            page: page,
            pages: serializedCategories.length,
            total: categories.length
        };
        responseBody.data = paginatedCategories[page - 1];
        if (query.page) {
            responseBody.pagination.page = query.per_page;
            responseBody.data = paginatedCategories[query.page - 1];
        }
    }
    return response.status(200).json(responseBody);
};
exports.getAllCategories = getAllCategories;
/**
 * Get category by id.
 */
const getCategoryByID = async (request, response) => {
    let categoryID = request.params.category_id;
    let category = await Category_1.Category.findByPk(categoryID);
    if (!category)
        return response.status(404).json({
            error: 'Not Found Error.',
            message: `Category with id ${categoryID} was not found.`
        });
    let categorySerialized = {
        id: category.id,
        name: category.name,
        created_at: category.createdAt,
        updated_at: category.updatedAt,
    };
    return response.status(200).json(categorySerialized);
};
exports.getCategoryByID = getCategoryByID;
/**
 * Store a new category.
 */
const storeNewCategory = async (request, response) => {
    let payload = request.body;
    let storedCategory = await Category_1.Category.findOne({
        where: {
            name: payload.name
        }
    });
    if (storedCategory)
        return response.status(409).json({
            error: 'Conflict Error.',
            message: `There is already a category named ${payload.name} stored.`
        });
    let newCategory = await Category_1.Category.create({
        name: payload.name,
    });
    let newSerializedCategory = {
        id: newCategory.id,
        name: newCategory.name,
        created_at: newCategory.createdAt,
        updated_at: newCategory.updatedAt
    };
    return response.status(200).json(newSerializedCategory);
};
exports.storeNewCategory = storeNewCategory;
const updateCategoryByID = async (request, response) => {
    let categoryID = request.params.category_id;
    let payload = request.body;
    let category = await Category_1.Category.findByPk(categoryID);
    if (!category)
        return response.status(404).json({
            error: 'Not Found Error.',
            message: `Category with id ${categoryID} was not found.`
        });
    let storedCategory = await Category_1.Category.findOne({
        where: {
            name: payload.name
        }
    });
    if (storedCategory)
        return response.status(409).json({
            error: 'Conflict Error.',
            message: `There is already a category named ${payload.name} stored.`
        });
    category.update({
        name: payload.name
    });
};
exports.updateCategoryByID = updateCategoryByID;
