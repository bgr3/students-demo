import {Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { blogsRepository } from "../repositories/blogs-repository";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}

export const blogValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const checkBlog = blogsRepository.findBlogByID(req.body.blogId)
    body('blogId').isString().withMessage('Blog does not exist')
    next()
}