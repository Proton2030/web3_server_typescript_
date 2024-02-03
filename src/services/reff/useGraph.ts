import UserModel from "../../models/user.model";
import { IUserSchema } from "../../ts/interfaces/user.interface";

class UserGraph {
  async addUser(user_id: string, referralCode: string, referredBy: string | null) {
    try {
      // Check if the user is already registered in the database
      const existingUser = await UserModel.findOne({ referralCode });
      if (existingUser) {
        throw new Error('User with this referral code is already registered.');
      }

      // Get referredBy user from the database
      const referredByUser = referredBy ? await UserModel.findOne({ referralCode: referredBy }) : null;

      // Calculate the level
      const level = referredByUser ? referredByUser.level + 1 : 0;

      // Create a new user document
      const user: IUserSchema = {
        user_id,
        is_active: false,
        is_mining: false,
        referralCode,
        referredBy,
        referredUsers: [],
        level,
        mining_time: 0
      };

      // Save the new user to the database
      const newUserInstance = await new UserModel(user).save();

      // Update referredByUser if applicable
      if (referredByUser) {
        await UserModel.updateOne({ referralCode: referredBy }, { $push: { referredUsers: newUserInstance.referralCode } });
      }

      return newUserInstance;
    } catch (error) {
      throw error;
    }
  }

  async getUserByReferralCode(referralCode: string) {
    return await UserModel.findOne({ referralCode });
  }

  async getLevelUsers(referralCode: string, numLevels: number) {
    try {
      const user = await UserModel.findOne({ referralCode });
      if (user) {
           const levelUsers: Record<number, IUserSchema[]> = {};
      await this.getUsersAtLevel(user, 0, numLevels, levelUsers);
      return levelUsers;
      }
    } catch (error) {
      console.log("🔴----->error",error);
      
    }
  }

  private async getUsersAtLevel(currentUser: IUserSchema, currentLevel: number, numLevels: number, levelUsers: Record<number, IUserSchema[]>) {
    if (currentLevel <= numLevels) {
      if (!levelUsers[currentLevel]) {
        levelUsers[currentLevel] = [];
      }
      levelUsers[currentLevel].push(currentUser);

      for (const code of currentUser.referredUsers) {
        const referredUser = await UserModel.findOne({ referralCode: code });
        if (referredUser) {
          await this.getUsersAtLevel(referredUser, currentLevel + 1, numLevels, levelUsers);
        }
      }
    }
  }
}

export const userGraph = new UserGraph();
