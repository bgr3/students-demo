import { Router } from 'express'
import { testingRouterController } from '../compositions-roots/testing-composition-root'

export const testingRouter = Router()

testingRouter.delete('/all-data', testingRouterController.allData.bind(testingRouterController))