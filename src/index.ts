import { runDb } from './db/db'
import {app} from './settings'
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 3000

const startApp = async () => {
  await runDb()
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}

startApp()