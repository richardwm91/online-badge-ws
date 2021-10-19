import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = `${process.env.GITHUB_BASE_URL}/login/oauth/access_token`;
    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    const response = await axios.get<IUserResponse>(
      `${process.env.GITHUB_API_BASE_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { id, login, name, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: { github_id: id },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
