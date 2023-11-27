import { SecurityController } from "../controllers/security-controller"
import { authService } from "./auth-composition-root"

export const securityController = new SecurityController(authService)