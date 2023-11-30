import { Router } from "express";
import { authenticationRefreshJWTMiddleware, authorizatioDeviceMiddleware } from "../middlewares/authorization-middleware";
import { container } from "../ioc-containers/ioc-container";
import { SecurityController } from "../controllers/security-controller";

const securityController = container.get<SecurityController>(SecurityController)

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