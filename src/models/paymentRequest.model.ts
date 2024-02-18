import { model } from "mongoose";
import { IPaymentRequestSchema } from "../ts/interfaces/payment.request.interface";
import PaymentRequestSchema from "./shcemaDefinations/paymentRequest.schema";

const PaymentRequestModel = model<IPaymentRequestSchema>("paymentRequest", PaymentRequestSchema);

export default PaymentRequestModel;
