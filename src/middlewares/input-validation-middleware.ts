import {Request, Response, NextFunction} from "express";
import { ValidationChain, validationResult } from "express-validator";
import { postBlogIdValidation, postContentValidation, postTitleValidation, postShortDescriptionValidation } from "../validation/post-validation";
import { blogDescriptionValidation, blogTitleValidation, blogWebsiteUrlValidation } from "../validation/blog-validation";
import { userEmailValidation, userLoginValidation, userPasswordValidation } from "../validation/user-validation";
import { commentContentValidation } from "../validation/comment-validation";
import { authEmailConfirmValidation, authEmailValidation, authPasswordRecoveryCodeValidation, authReSendEmailConfirmValidation, userNewPasswordValidation } from "../validation/auth-validation";

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

export const blogPostInputValidationMiddleware = (): ValidationChain[] => [
    postTitleValidation,
    postContentValidation,
    postShortDescriptionValidation,
]
    
export const blogInputValidationMiddleware = (): ValidationChain[] => [
    blogTitleValidation,
    blogDescriptionValidation,
    blogWebsiteUrlValidation,
]

export const userInputValidationMiddleware = (): ValidationChain[] => [
    userLoginValidation,
    userPasswordValidation,
    userEmailValidation,
]

export const commentInputValidationMiddleware = (): ValidationChain[] => [
    commentContentValidation,
]

export const authInputValidationMiddleware = (): ValidationChain[] => [
    authEmailConfirmValidation
]

export const authReSendValidationMiddleware = (): ValidationChain[] => [
    authReSendEmailConfirmValidation
]

export const authRecoveryPasswordSendMiddleware = (): ValidationChain[] => [
    authEmailValidation
]

export const authRecoveryPasswordMiddleware = (): ValidationChain[] => [
    userNewPasswordValidation,
    authPasswordRecoveryCodeValidation
]
