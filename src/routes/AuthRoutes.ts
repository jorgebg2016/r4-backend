

import { Router } from 'express';
import { 
    login,
} from '../controllers/AuthController';

const authRouter: Router = Router();

authRouter.route('/').post(login);

export default authRouter;