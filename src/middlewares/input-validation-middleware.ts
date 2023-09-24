import {Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { postBlogIdValidation, postContentValidation, postTitleValidation, postShortDescriptionValidation } from "../check/post-validation";
import { ValidationResultError } from "../models/validation-types";

class Messages {
    message: string | undefined;
    field: string | undefined;
  }

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true })
        const validationErrors: any = [];
        errors.array().forEach((error) => {
            if (error.type === 'field') {
                let err = new Messages;
                err.message = error.msg;
                err.field = error.path;
                validationErrors.push(err);
            }

        });
        res.status(400).json({ errorMessages: validationErrors });
    } else {
        next()
    }
}

export const postInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    postTitleValidation;
    postContentValidation;
    postBlogIdValidation;
    postShortDescriptionValidation;
    next()
}
    
// "type": "field",
// "value": null,
// "msg": "Blog does not exist",
// "path": "blogId",
// "location": "body"