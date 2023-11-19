import { body } from "express-validator"
import { usersRepository } from "../repositories/users-repository/users-db-repository";
import add from 'date-fns/add'

export const authEmailConfirmValidation = 

    body('code')
    .trim()
    .custom(async value => {
        return  await usersRepository.findUserByConfirmationCode(value).then(user => {
            if (!user) return Promise.reject('User doesn`t exist');
            if (user.emailConfirmation.isConfirmed) return Promise.reject('User already confirmed');
            if (user.emailConfirmation.confirmationCode !== value) return Promise.reject('Confirmation code doesn`t match');
            if (user.emailConfirmation.expirationDate < new Date()) return Promise.reject('Code already expired');
          return value
        })
    })

export const authReSendEmailConfirmValidation = 

    body('email')
    .trim()
    .custom(async value => {
        return  await usersRepository.findUserByLoginOrEmail(value).then(user => {
            if (!user) return Promise.reject('User doesn`t exist');
            if (user.emailConfirmation.isConfirmed) return Promise.reject('User already confirmed');
            if (user.emailConfirmation.nextSend > new Date()) return Promise.reject('too often');
          return value
        })
    })

export const authEmailValidation =
    
    body('email')
    .trim()
    .exists()
    .isLength({min:1, max: 100}).withMessage('Email length does not exist')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('Email does not exist')

export const authPasswordRecoveryCodeValidation = 

    body('recoveryCode')
    .trim()
    .custom(async value => {
        return  await usersRepository.findUserByConfirmationCode(value).then(user => {
            if (!user) return Promise.reject('User doesn`t exist');
            if (user.emailConfirmation.confirmationCode !== value) return Promise.reject('Confirmation code doesn`t match');
            if (user.emailConfirmation.expirationDate < new Date()) return Promise.reject('Code already expired');
          return value
        })
    })

export const userNewPasswordValidation =
    
    body('newPassword')
    .trim()
    .isLength({min:6, max: 20}).withMessage('Password not exist')
