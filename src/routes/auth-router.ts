import { Router } from "express";
import { authenticationJWTMiddleware, authenticationRefreshJWTMiddleware } from "../middlewares/authorization-middleware";
import { authInputValidationMiddleware, authReSendValidationMiddleware, authRecoveryPasswordMiddleware, authRecoveryPasswordSendMiddleware, inputValidationMiddleware, userInputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { accessFrequencyMiddleware } from "../middlewares/access-middleware";
import { authController } from "../compositions-roots/auth-composition-root";

export const authRouter = Router({});

authRouter.post('/login',
  accessFrequencyMiddleware,
  authController.loginUser.bind(authController)
)

authRouter.post('/password-recovery', 
  accessFrequencyMiddleware,
  authRecoveryPasswordSendMiddleware(),
  inputValidationMiddleware,
  authController.passwordRecovery.bind(authController)
)

authRouter.post('/new-password',
  accessFrequencyMiddleware,
  authRecoveryPasswordMiddleware(),  
  inputValidationMiddleware,
  authController.newPassword.bind(authController)
)

authRouter.post('/refresh-token', 
  authenticationRefreshJWTMiddleware,
  authController.refreshTokens.bind(authController)
)

authRouter.post('/logout', 
  authenticationRefreshJWTMiddleware,
  authController.logout.bind(authController)
)

authRouter.get('/me',
  authenticationJWTMiddleware,
  authController.aboutMe.bind(authController)
)

authRouter.post('/registration',
  accessFrequencyMiddleware,
  userInputValidationMiddleware(),
  inputValidationMiddleware,
  authController.registration.bind(authController)
)

authRouter.post('/registration-confirmation',
  accessFrequencyMiddleware,
  authInputValidationMiddleware(),  
  inputValidationMiddleware,
  authController.registrationConfirmation.bind(authController)
)

authRouter.post('/registration-email-resending',
  accessFrequencyMiddleware,
  authReSendValidationMiddleware(),
  inputValidationMiddleware,
  authController.emailResending.bind(authController)
)