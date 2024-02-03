import { Schema, VirtualTypeOptions } from "mongoose";
import { IUserSchema } from "../../ts/interfaces/user.interface";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";


const UserSchema: Schema<IUserSchema> = new Schema<IUserSchema>(
	{
		user_id: SCHEMA_DEFINITION_PROPERTY.requiredString,
		is_active: SCHEMA_DEFINITION_PROPERTY.requiredBoolean,
	    is_mining: SCHEMA_DEFINITION_PROPERTY.requiredBoolean,
		mining_time:SCHEMA_DEFINITION_PROPERTY.requiredNumber,
	    referralCode:SCHEMA_DEFINITION_PROPERTY.requiredString,
	    referredBy:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
	    referredUsers:SCHEMA_DEFINITION_PROPERTY.optionalNullObject,
	    level:SCHEMA_DEFINITION_PROPERTY.requiredNumber
	},
	GENERAL_SCHEMA_OPTIONS
);

export default UserSchema;
