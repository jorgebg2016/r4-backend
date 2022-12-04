
import { Router } from 'express';
import { 
    getAllCategories, 
    getCategoryByID, 
    storeNewCategory,
    updateCategoryByID
} from '../controllers/CategoriesController';


const categoriesRouter: Router = Router();

categoriesRouter.route('/').get(getAllCategories);

categoriesRouter.route('/:category_id').get(getCategoryByID);

categoriesRouter.route('/').post(storeNewCategory);

categoriesRouter.route('/:category_id/update').put(updateCategoryByID);

export default categoriesRouter;