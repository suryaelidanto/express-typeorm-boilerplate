import { Request, Response } from "express";
import UserService from "../services/UsersService";

class UserController {
  async find(req: Request, res: Response) {
    try {
      const response = await UserService.find();
      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
}

export default new UserController();
