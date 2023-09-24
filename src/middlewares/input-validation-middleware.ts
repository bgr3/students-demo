import {Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { blogsRepository } from "../repositories/blogs-repository";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errorMessages: errors.array() });
    } else {
        next()
    }
}

export const blogValidationMiddleware =
    body('blogId')
    .trim()
    .isLength({min:1})
    .customSanitizer(async (value) => {
        const checkBlog = blogsRepository.findBlogByID(value)
        if (!checkBlog){
            return null
        } else {
            return value
        }
    })
    .exists({checkNull: true}) 
    .withMessage('Blog does not exist')
