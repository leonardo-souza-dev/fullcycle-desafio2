import dotenv from 'dotenv'
import express from 'express'
import Setup from './infra/setup'
import UserController from './controllers/user-controller'

dotenv.config()

const app = express()

app.use(express.json())

new Setup().setupDatabase()

const userController = new UserController()

app.use('/api/users', userController.getRouter())

export default app