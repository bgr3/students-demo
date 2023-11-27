import { TestingController } from "../controllers/testing-controller"
import { authService } from "./auth-composition-root"
import { blogsService } from "./blogs-composition-root"
import { commentsService } from "./comments-composition-root"
import { postsService } from "./posts-composition-root"

export const testingController = new TestingController(blogsService, postsService, commentsService, authService)