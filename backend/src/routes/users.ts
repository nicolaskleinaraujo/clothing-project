// Imports
import express, { Request, Response, IRouter } from "express"
import { userController } from "../controllers/user"
import validateUser from "../middlewares/validateUser"
import validateToken from "../middlewares/validateToken"

const usersRouter: IRouter = express.Router()

// Routes
usersRouter.route("/").post((req: Request, res: Response) => userController.createUserController(req, res))
usersRouter.route("/").put(validateToken, validateUser, (req: Request, res: Response) => userController.updateUserController(req, res))
usersRouter.route("/").delete(validateToken, validateUser, (req: Request, res: Response) => userController.deleteUserController(req, res))
usersRouter.route("/login").post((req: Request, res: Response) => userController.createLoginController(req, res))
usersRouter.route("/tryauth").post((req: Request, res: Response) => userController.tryAuthController(req, res))
usersRouter.route("/removeauth").get((req: Request, res: Response) => userController.removeAuthController(req, res))
usersRouter.route("/id").post(validateToken, validateUser, (req: Request, res: Response) => userController.getUserByIdController(req, res))

export default usersRouter
