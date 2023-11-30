import { Router } from 'express'
import { container } from '../ioc-containers/ioc-container'
import { TestingController } from '../controllers/testing-controller'

const testingController = container.get<TestingController>(TestingController)

export const testingRouter = Router()

testingRouter.delete('/all-data', testingController.allData.bind(testingController))