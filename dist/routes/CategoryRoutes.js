"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriesController_1 = require("../controllers/CategoriesController");
const categoriesRouter = (0, express_1.Router)();
categoriesRouter.route('/').get(CategoriesController_1.getAllCategories);
categoriesRouter.route('/:category_id').get(CategoriesController_1.getCategoryByID);
categoriesRouter.route('/').post(CategoriesController_1.storeNewCategory);
categoriesRouter.route('/:category_id/update').put(CategoriesController_1.updateCategoryByID);
exports.default = categoriesRouter;
