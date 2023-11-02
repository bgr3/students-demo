import express, {Request, Response} from 'express'
import { videosRouter } from './routes/videos-router'
import { testingRouter } from './routes/testing-router'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { usersRouter } from './routes/users-router'
import { authRouter } from './routes/auth-router'
import { commentsRouter } from './routes/comments-router'
import cookieParser from 'cookie-parser'

export const app = express()
export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  NOT_FOUND_404: 404,
}

export const RouterPaths = {
  comments: '/comments',
  users: '/users',
  auth: '/auth',
  testing: '/testing',
  videos: '/videos',
  blogs: '/blogs',
  posts: '/posts',
  api: '/api',
  hometask: '/hometask_08',
}

app.use(express.json())
app.use(cookieParser())


app.get('/', (req: Request, res: Response) => {
  let hello = `Hello!`;
  res.send(hello);
})

app.use(RouterPaths.hometask + RouterPaths.api + RouterPaths.testing, testingRouter)
app.use(RouterPaths.hometask + RouterPaths.api + RouterPaths.videos, videosRouter)
app.use(RouterPaths.hometask + RouterPaths.api + RouterPaths.blogs, blogsRouter)
app.use(RouterPaths.hometask + RouterPaths.api + RouterPaths.posts, postsRouter)
app.use(RouterPaths.hometask + RouterPaths.api + RouterPaths.users, usersRouter)
app.use(RouterPaths.hometask + RouterPaths.api + RouterPaths.auth, authRouter)
app.use(RouterPaths.hometask + RouterPaths.api + RouterPaths.comments, commentsRouter)

if (!process.env.JWT_SECRET) {
  throw new Error('! JWT doesn`t found')
}

export const settings = {
  JWT_SECRET: process.env.JWT_SECRET
}


