import { body, param } from "express-validator"
import { blogsService } from "../domain/blog-service" 

export const postTitleValidation = 
    
    body('title')
    .trim()
    .isLength({min:1, max: 15}).withMessage('title does not exist')

export const postContentValidation =
    
    body('content')
    .trim()
    .exists()
    .isLength({min:1, max: 1000}).withMessage('Content not exist')



export const postBlogIdValidation =
    
    body('blogId')
    .trim()
    .isLength({min:1})
    .customSanitizer(async (value) => {
        const checkBlog = await blogsService.findBlogByID(value)
        if (!checkBlog){
            return null
        } else {
            return value
        }
    })
    .exists({checkNull: true}).withMessage('Blog does not exist')

export const postShortDescriptionValidation =
    
    body('shortDescription')
    .trim()
    .isLength({min:1, max: 100}).withMessage('ShortDescription not exist')

export const blogPostBlogIdValidation =
    
    param('id')
    .trim()
    .isLength({min:1})
    .customSanitizer(async (value) => {
        const checkBlog = await blogsService.findBlogByID(value)
        if (!checkBlog){
            return null
        } else {
            return value
        }
    })
    .exists({checkNull: true}).withMessage('Blog does not exist')