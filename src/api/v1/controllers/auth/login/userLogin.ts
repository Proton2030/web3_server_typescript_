import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";
import { IUserSchema } from "../../../../../ts/interfaces/user.interface";
import { service } from "../../../../../services/index.service";
import bcrypt from "bcryptjs";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await service.auth.isDuplicateUserEmailService(UserModel, email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({
    //     message: "Invalid email or password",
    //   });
    // }

    // const jwtToken = await service.auth.generateJWT({
    //   ...user
    // });

    return res.status(200).json({
      message: "Login successful",
    //   token: jwtToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
