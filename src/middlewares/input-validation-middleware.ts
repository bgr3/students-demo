import {Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { postBlogIdValidation, postContentValidation, postTitleValidation, postShortDescriptionValidation } from "../validation/post-validation";
import { blogDescriptionValidation, blogTitleValidation, blogWebsiteUrlValidation } from "../validation/blog-validation";

class Messages {
    message: string | undefined;
    field: string | undefined;
  }

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        const validationErrors: any = [];
       
        errors.array({ onlyFirstError: true }).forEach((error) => {
            
            if (error.type === 'field') {
                let err = new Messages;
                err.message = error.msg;
                err.field = error.path;
                validationErrors.push(err);
            } else {
                let err = new Messages;
                err.message = error.msg;
                err.field = 'any';
                validationErrors.push(err);
            }

        });
        res.status(400).json({ errorsMessages: validationErrors });
    } else {
        next()
    }
}

export const postInputValidationMiddleware = (): ValidationChain[] => [
    postTitleValidation,
    postContentValidation,
    postBlogIdValidation,
    postShortDescriptionValidation,
]
    
export const blogInputValidationMiddleware = (): ValidationChain[] => [
    blogTitleValidation,
    blogDescriptionValidation,
    blogWebsiteUrlValidation,
]