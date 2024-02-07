import { Model, Document } from "mongoose";
import { Request, Response } from "express";
import UserModel from "../../../models/user.model";

export const updateUserMiningStatus= async(req: Request, res: Response)=> {
  const {user_id}  = req.params;
  try {
    const user = await UserModel.findOne({ user_id: user_id });

    if (!user) {
      res.status(404).json({ status: 404, message: "User not found" });
      return;
    }

    user.is_mining = true;
    user.mining_time = new Date().getTime();

    // if (user.is_active) {
    //   user.mining_balance += 2700;
    // } else {
    //   user.mining_balance += 900;
    // }

    await user.save();
    
    res.status(200).json({ status: 200, data: user, message: `${user_id} updated successfully` });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
}
