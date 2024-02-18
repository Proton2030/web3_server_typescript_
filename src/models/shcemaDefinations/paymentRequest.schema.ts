import { Schema, VirtualTypeOptions } from "mongoose";
import { IUserSchema } from "../../ts/interfaces/user.interface";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IPaymentRequestSchema } from "../../ts/interfaces/payment.request.interface";


const PaymentRequestSchema: Schema<IPaymentRequestSchema> = new Schema<IPaymentRequestSchema>(
	{
		user_id: SCHEMA_DEFINITION_PROPERTY.requiredString,
        hash_id:SCHEMA_DEFINITION_PROPERTY.requiredString,
		is_payed:SCHEMA_DEFINITION_PROPERTY.requiredBoolean
		
	},
	GENERAL_SCHEMA_OPTIONS
);

export default PaymentRequestSchema;
