// Imports
import express, { Request, Response, IRouter } from "express"
import { addressController } from "../controllers/address/index"
import validateUser from "../middlewares/validateUser"
import validateToken from "../middlewares/validateToken"

const addressRouter: IRouter = express.Router()

// Routes
addressRouter.route("/").post(validateToken, validateUser, (req: Request, res: Response) => addressController.createAddressController(req, res))
addressRouter.route("/").put(validateToken, validateUser, (req: Request, res: Response) => addressController.updateAddressController(req, res))
addressRouter.route("/").delete(validateToken, validateUser, (req: Request, res: Response) => addressController.deleteAddressController(req, res))
addressRouter.route("/user").post(validateToken, validateUser, (req: Request, res: Response) => addressController.getByUserController(req, res))

export default addressRouter
