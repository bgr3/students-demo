import {Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}

export const titleValidationMiddleware = body('title').isLength({min: 3, max: 10}).withMessage('Title length should be from 3 to 10 symbols')