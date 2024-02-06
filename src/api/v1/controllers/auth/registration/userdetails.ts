import { Model, Document } from "mongoose";
import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";

export const findUserByUserId = async(req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const user = await UserModel.findOne({ user_id });

    if (user) {
      res.status(200).json({ status: 200, data: user, message: "User found successfully." });
    } else {
      res.status(404).json({ status: 404, message: "User not found." });
    }
  } catch (error) {
    console.error("Error finding user by user_id:", error);
    res.status(500).json({ status: 500, message: "Internal server error." });
  }
}

// Usage example in an Express route:
// app.post("/find-user", findUserByUserId);
