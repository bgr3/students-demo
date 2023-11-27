import { Router } from "express";
import { authenticationRefreshJWTMiddleware, authorizatioDeviceMiddleware } from "../middlewares/authorization-middleware";
import { securityController } from "../compositions-roots/security-composition-root";

export const securityRouter = Router({});

securityRouter.get('/devices',
    authenticationRefreshJWTMiddleware,
    securityController.getDevices.bind(securityController)
)

securityRouter.delete('/devices',
    authenticationRefreshJWTMiddleware,
    securityController.deleteDevices.bind(securityController)
)

securityRouter.delete('/devices/:deviceId',
    authenticationRefreshJWTMiddleware,
    authorizatioDeviceMiddleware,
    securityController.deleteDevice.bind(securityController)
)