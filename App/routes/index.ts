import { Router } from "express";
import categoriesRouter from "./CategoryRoutes";

const router: Router = Router();

router.use('/categories', categoriesRouter);

export default router;