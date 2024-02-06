import { Model, Document } from "mongoose";
import { Request, Response } from "express";
import UserModel from "../../../models/user.model";


export const ActiveAccount= async(req: Request, res: Response)=> {
  const {user_id}  = req.params;
  try {
    // Find the user by user_id
    const user = await UserModel.findOne({ user_id: user_id });

    if (!user) {
        res.status(404).json({ status: 404, message: "not found" });

      return;
    }

    user.is_active = true;

    await user.save();
    res.status(200).json({ status: 200, data: user, message: `${user_id} updated successfully` });

  } catch (error) {
    res.status(404).json({ status: 404, message: error });

  }
}

