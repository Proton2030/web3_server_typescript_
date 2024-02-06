import { IObjectId } from "./objectId.interface";

export interface IUserSchema {
  user_id: string;
  is_active: boolean;
  is_mining: boolean;
  mining_time:number;
  mining_balance:number;
  referralCode: string;
  referredBy: string | null ;
  referredUsers: string[];
  level: number;
}

export interface IUser extends IUserSchema, IObjectId {}
