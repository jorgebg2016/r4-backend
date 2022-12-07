
import { Router } from 'express';
import { 
    getAllCategories, 
    getCategoryByID, 
    storeNewCategory,
    updateCategoryByID,
    deleteCategoryByID
} from '../controllers/CategoriesController';
import { auth } from '../middleware/auth.middleware';


const categoriesRouter: Router = Router();

categoriesRouter.route('/').get(auth(), getAllCategories);

categoriesRouter.route('/:category_id').get(auth(), getCategoryByID);

categoriesRouter.route('/').post(auth(), storeNewCategory);

categoriesRouter.route('/:category_id/update').put(auth(), updateCategoryByID);

categoriesRouter.route('/:category_id/delete').delete(auth(), deleteCategoryByID);

export default categoriesRouter;