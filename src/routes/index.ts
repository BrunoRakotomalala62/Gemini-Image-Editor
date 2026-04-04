import { Router, type IRouter } from "express";
import healthRouter from "./health";
import nanobananaRouter from "./nanobanana";
import docsRouter from "./docs";

const router: IRouter = Router();

router.use(docsRouter);
router.use(healthRouter);
router.use(nanobananaRouter);

export default router;
