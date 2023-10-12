import { body } from "express-validator"

export const userLoginValidation = 
    
    body('login')
    .trim()
    .isLength({min:3, max: 10})
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('login does not exist')

export const userPasswordValidation =
    
    body('password')
    .trim()
    .isLength({min:6, max: 20}).withMessage('Password not exist')


export const userEmailValidation =
    
    body('websiteUrl')
    .trim()
    .exists()
    .isLength({min:1, max: 100})
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('WebsiteUrl length does not exist')