import { Schema, VirtualTypeOptions } from "mongoose";
import { IUserSchema } from "../../ts/interfaces/user.interface";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";


const UserSchema: Schema<IUserSchema> = new Schema<IUserSchema>(
	{
		first_name: SCHEMA_DEFINITION_PROPERTY.requiredString,
		last_name: SCHEMA_DEFINITION_PROPERTY.requiredString,
		age: SCHEMA_DEFINITION_PROPERTY.requiredString,
		email: SCHEMA_DEFINITION_PROPERTY.requiredString,
		password: SCHEMA_DEFINITION_PROPERTY.requiredString,
        height: SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
        weight:SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,

	},
	GENERAL_SCHEMA_OPTIONS
);

export default UserSchema;
