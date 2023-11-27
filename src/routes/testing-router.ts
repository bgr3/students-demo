import { Router } from 'express'
import { testingController } from '../compositions-roots/testing-composition-root'

export const testingRouter = Router()

testingRouter.delete('/all-data', testingController.allData.bind(testingController))