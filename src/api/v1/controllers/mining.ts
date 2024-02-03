import UserModel from "../../../models/user.model";

export const updateUserMiningStatus= async(userId:any)=> {
  try {
    // Find the user by user_id
    const user = await UserModel.findOne({ user_id: userId });

    if (!user) {
      // Handle the case where the user with the given user_id is not found
      console.log(`User with user_id ${userId} not found`);
      return;
    }

    // Update user's is_mining to true and set mining_time to 3
    user.is_mining = true;
    user.mining_time = 3;

    // Save the updated user
    await user.save();

    console.log(`User with user_id ${userId} updated successfully`);
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error('Error updating user:', error);
  }
}

