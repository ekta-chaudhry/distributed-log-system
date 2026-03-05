import { Router, type IRouter, type Request, type Response } from "express";
import { body, validationResult } from "express-validator";
import { LogLevel } from "../enums/log";

const router: IRouter = Router();

const validateLog = [
  body("timestamp")
    .isString()
    .withMessage("timestamp must be a string")
    .isISO8601()
    .withMessage("timestamp must be a valid ISO 8601 date string"),
  body("service")
    .isString()
    .withMessage("service must be a string")
    .notEmpty()
    .withMessage("service is required"),
  body("level")
    .isString()
    .withMessage("level must be a string")
    .isIn(Object.values(LogLevel))
    .withMessage(`level must be one of: ${Object.values(LogLevel).join(", ")}`),
  body("message")
    .isString()
    .withMessage("message must be a string")
    .notEmpty()
    .withMessage("message is required"),
];

router.post("/", validateLog, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { timestamp, service, level, message } = req.body;

  const logEntry = {
    timestamp,
    service,
    level: level as LogLevel,
    message,
  };

  console.log("Log received:", logEntry);

  res.status(201).json({ status: "accepted", log: logEntry });
});

export { router as logRouter };
