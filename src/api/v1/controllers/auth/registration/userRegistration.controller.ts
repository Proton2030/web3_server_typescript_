import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";
import { IUserSchema } from "../../../../../ts/interfaces/user.interface";
import { service } from "../../../../../services/index.service";

export const userRegistration =async (req: Request, res: Response) => {
try {
    const userDetails: IUserSchema = req.body;


      const isDuplicateAdminEmail = await service.auth.isDuplicateUserEmailService(UserModel, userDetails.email);

      if (isDuplicateAdminEmail) {
          return res.status(409).json({ 
              message: "Email is already registered!"
          });
      }

       const UserInstance = await new UserModel(userDetails).save()
    return res.status(200).json({
       message: "User Registration Done!",
       result: UserInstance
   });  
   
} catch (error) {
    console.log(error);
    return res.status(422).json({
        message: "fail",
			error
    })
    
}
}