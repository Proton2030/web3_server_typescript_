import { Model, Document } from "mongoose";
import { Request, Response } from "express";
import UserModel from "../../../models/user.model";
import PaymentRequestModel from "../../../models/paymentRequest.model";


export const ActiveAccount= async(req: Request, res: Response)=> {
  const {user_id,hash_id}  = req.params;
  try {
    const user = await UserModel.findOne({ user_id: user_id });

    if (!user) {
        res.status(404).json({ status: 404, message: "not found" });

      return;
    }

    user.is_active = true;
    await user.save();

    const newPaymentRequest = new PaymentRequestModel({
      user_id,
      hash_id,
      is_payed: true 
  });

  const paymentRequest = await newPaymentRequest.save();

    res.status(200).json({ status: 200, data: paymentRequest, message: `${user_id} updated successfully` });

  } catch (error) {
    res.status(404).json({ status: 404, message: error });

  }
}

