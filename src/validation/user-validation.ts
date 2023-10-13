import { body } from "express-validator"
import { usersRepository } from "../repositories/users-db-repository";

export const userLoginValidation = 
    
    body('login')
    .trim()
    .isLength({min:3, max: 10})
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('login does not exist')
    .custom(value => {
        return usersRepository.findUserByLoginOrEmail(value).then(user => {
          if (user) {
            return Promise.reject('Login already in use');
          }
        })
    })

export const userPasswordValidation =
    
    body('password')
    .trim()
    .isLength({min:6, max: 20}).withMessage('Password not exist')


export const userEmailValidation =
    
    body('email')
    .trim()
    .exists()
    .isLength({min:1, max: 100}).withMessage('Email length does not exist')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('Email does not exist')
    .custom(value => {
        return usersRepository.findUserByLoginOrEmail(value).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        })
    })