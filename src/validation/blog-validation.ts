import { body } from "express-validator"

export const blogTitleValidation = 
    
    body('name')
    .trim()
    .isLength({min:1, max: 15}).withMessage('name does not exist')

export const blogDescriptionValidation =
    
    body('description')
    .trim()
    .exists()
    .isLength({min:1, max: 500}).withMessage('Description not exist')


export const blogWebsiteUrlValidation =
    
    body('websiteUrl')
    .trim()
    .exists()
    .isLength({min:1, max: 100}).withMessage('WebsiteUrl length does not exist')
    .customSanitizer(async (value) => {
        if (!/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(value)){
            return null
        } else {
            return value
        }
    })
    .exists({checkNull: true}).withMessage('WebsiteUrl does not exist')