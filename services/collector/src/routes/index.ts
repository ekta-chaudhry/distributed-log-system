import { Router, type IRouter } from "express";
import { healthRouter } from "./health";
import { logRouter } from "./log";

const router: IRouter = Router();

router.use("/health", healthRouter);
router.use("/log", logRouter);

export { router as v1Router };
