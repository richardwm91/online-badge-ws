import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    try {
      const { code } = request.body;
      const result = await new AuthenticateUserService().execute(code);
      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };
