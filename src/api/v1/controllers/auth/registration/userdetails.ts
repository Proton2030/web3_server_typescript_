import { Model, Document } from "mongoose";
import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";

// Assuming you have a model defined somewhere, you can use it like this:
// const UserModel: Model<IUserSchema & Document> = mongoose.model("User", UserSchema);

// Example function to find a user by user_id from req.body with status codes
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
