import { body } from "express-validator"
import { blogsRepository } from "../repositories/blogs-repository"

export const postTitleValidation = body('title')
    .trim()
    .isLength({min:1, max: 15})
    .withMessage('ShortDescription not exist')

export const postContentValidation =
body('content')
.trim()
.isLength({min:1, max: 1000})
.withMessage('Content not exist')



export const postBlogIdValidation =
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

export const shortDescriptionValidation =
    body('shortDescription')
    .trim()
    .isLength({min:1, max: 100})
    .withMessage('ShortDescription not exist')