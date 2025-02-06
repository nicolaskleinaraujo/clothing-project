// Imports
import express, { Request, Response, IRouter } from "express"
import { categoryController } from "../controllers/category"

const categoriesController: IRouter = express.Router()

// Routes
categoriesController.route("/").post((req: Request, res: Response) => categoryController.createCategoryController(req, res))
categoriesController.route("/").put((req: Request, res: Response) => categoryController.updateCategoryController(req, res))
categoriesController.route("/").delete((req: Request, res: Response) => categoryController.deleteCategoryController(req, res))
categoriesController.route("/").get((req: Request, res: Response) => categoryController.sortCategoryController(req, res))

export default categoriesController
