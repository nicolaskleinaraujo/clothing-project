// Imports
import express, { Request, Response, IRouter } from "express"
import { productController } from "../controllers/product"
import validateAdmin from "../middlewares/validateAdmin"
import upload from "../config/multer"

const productsRouter: IRouter = express.Router()

// Routes
productsRouter.route("/").post(upload.array("file"), (req: Request, res: Response) => productController.createProductController(req, res))
productsRouter.route("/").put(validateAdmin, (req: Request, res: Response) => productController.updateProductController(req, res))
productsRouter.route("/").delete(validateAdmin, (req: Request, res: Response) => productController.deleteProductController(req, res))
productsRouter.route("/avaiable").patch(validateAdmin, (req: Request, res: Response) => productController.changeAvaiableController(req, res))
productsRouter.route("/").get((req: Request, res: Response) => productController.sortProductController(req, res))
productsRouter.route("/slug/:slug").get((req: Request, res: Response) => productController.getBySlugController(req, res))

export default productsRouter
