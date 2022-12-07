import { Router } from "express";
import categoriesRouter from "./CategoryRoutes";
import authRouter from './AuthRoutes';

const router: Router = Router();

router.use('/api/v1/login', authRouter);

router.use('/api/v1/categories', categoriesRouter);

export default router;