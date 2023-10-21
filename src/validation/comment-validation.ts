import { body, param} from "express-validator"
import { postsService } from "../domain/post-service"

export const commentContentValidation = 
    
    body('content')
    .trim()
    .isLength({min:20, max: 300}).withMessage('content does not exist')

export const commentPostPostIdValidation =
    
    param('id')
    .trim()
    .isLength({min:1})
    .custom(async value => {
        return await postsService.findPostById(value).then(user => {
          if (user) {
            return Promise.reject('Post does not exist');
          }
          return value
        })

    })

