import { body } from "express-validator"

export const commentContentValidation = 
    
    body('content')
    .trim()
    .isLength({min:20, max: 300}).withMessage('content does not exist')

