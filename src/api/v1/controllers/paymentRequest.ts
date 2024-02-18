import { Request, Response } from 'express';
import PaymentRequestModel from '../../../models/paymentRequest.model';
import UserModel from '../../../models/user.model';

export const createPaymentRequest = async (req: Request, res: Response) => {
    try {
        const { user_id, hash_id } = req.body;

        const existingRequest = await PaymentRequestModel.findOne({ hash_id });
        if (existingRequest) {
            return res.status(400).json({ message: 'Hash ID already exists' });
        }

        const newPaymentRequest = new PaymentRequestModel({
            user_id,
            hash_id,
            is_payed: false 
        });

        const paymentRequest = await newPaymentRequest.save();

        return res.status(200).json({ data: paymentRequest, message: 'Payment request created successfully' });
    } catch (error) {
        console.error('Error creating payment request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



export const editPaymentRequest = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const paymentRequest = await PaymentRequestModel.findOne({ user_id });
        if (!paymentRequest) {
            return res.status(404).json({ message: 'Payment request not found' });
        }

        paymentRequest.is_payed = true;
        await paymentRequest.save();

        const user = await UserModel.findOne({ user_id });
        if (user) {
            user.is_active = true;
            await user.save();
        }

        return res.status(200).json({ message: 'Payment request updated successfully' });
    } catch (error) {
        console.error('Error updating payment request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deletePaymentRequest = async (req: Request, res: Response) => {
    try {
        const { hash_id } = req.params;

        const deletedPaymentRequest = await PaymentRequestModel.findOneAndDelete({hash_id});
        if (!deletedPaymentRequest) {
            return res.status(404).json({ message: 'Payment request not found' });
        }

        return res.status(200).json({ message: 'Payment request deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAllPaymentRequests = async (req: Request, res: Response) => {
    try {
        // Extract the is_payed and searchQuery from the request query parameters
        const { is_payed, hash_id } = req.query;

        // Construct the query object based on is_payed and searchQuery
        let query: any = {};
        if (is_payed) {
            query.is_payed = is_payed;
        }
        if (hash_id) {
            query = {
                ...query,
                $or: [
                    { hash_id: { $regex: hash_id, $options: 'i' } }, // Case-insensitive search by hash_id
                    // Add more fields to search if needed
                ]
            };
        }

        // Find payment requests based on the constructed query
        const paymentRequests = await PaymentRequestModel.find(query);

        // Check if payment requests were found
        if (!paymentRequests || paymentRequests.length === 0) {
            return res.status(404).json({ message: 'No payment requests found' });
        }

        // Send the payment requests as response
        return res.status(200).json({ data: paymentRequests, message: 'All payment requests retrieved successfully' });
    } catch (error) {
        console.error('Error retrieving payment requests:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};