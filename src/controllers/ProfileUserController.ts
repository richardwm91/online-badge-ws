import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    try {
      const { user_id } = request.body;
      const result = await new ProfileUserService().execute(user_id);
      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { ProfileUserController };
