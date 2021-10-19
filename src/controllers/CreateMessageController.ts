import { Request, Response } from "express";
import { CreateMessegeService } from "../services/CreateMessegeService";

class CreateMessageController {
  async handle(request: Request, response: Response) {
    try {
      const { message } = request.body;
      const { user_id } = request;
      const result = await new CreateMessegeService().execute(message, user_id);

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { CreateMessageController };
