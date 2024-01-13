import { IObjectId } from "./objectId.interface";
export interface IUserSchema {
	first_name: string;
	last_name: string;
	gender: string;
	age: number;
	password: string;
	email: string;
	height: number;
	weight:number;

}

export interface IUser extends IUserSchema, IObjectId {}
