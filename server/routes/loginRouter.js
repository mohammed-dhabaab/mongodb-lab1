import express from "express"
import { login } from "../controllers/loginControllers.js"

const loginRouter = express.Router()

loginRouter.post("/", login)

export default loginRouter