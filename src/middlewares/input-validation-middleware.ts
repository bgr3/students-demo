import {Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { postBlogIdValidation, postContentValidation, postTitleValidation, shortDescriptionValidation } from "../check/post-validation";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errorMessages: errors.array() });
    } else {
        next()
    }
}

export const postInputValidationMiddleware = () => {
    postTitleValidation;
    postContentValidation;
    postBlogIdValidation;
    shortDescriptionValidation;
}
    