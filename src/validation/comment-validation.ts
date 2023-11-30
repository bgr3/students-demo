import { body } from "express-validator"

export const commentContentValidation = 
    
    body('content')
    .trim()
    .isLength({min:20, max: 300}).withMessage('content does not exist')

export const commentLikeStatusValidation = 
    
    body('likeStatus')
    .trim()
    .custom(async value => {
          if (!['Like', 'Dislike', 'None'].includes(value)) {
            return Promise.reject('likeStatus does not exist');
          }
          return value
    })