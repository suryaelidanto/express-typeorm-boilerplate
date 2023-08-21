import * as express from "express";
import UsersController from "../controllers/UsersController";
import { authenticate } from "../middlewares/auth";
import AuthController from "../controllers/AuthController";

const router = express.Router();

router.post("/auth/login", authenticate, AuthController.login);
router.post("/auth/register", AuthController.register);

router.get("/users", authenticate, UsersController.find);

export default router;
