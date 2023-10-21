import { body, param} from "express-validator"
import { postsService } from "../domain/post-service"

export const commentContentValidation = 
    
    body('content')
    .trim()
    .isLength({min:20, max: 300}).withMessage('content does not exist')

