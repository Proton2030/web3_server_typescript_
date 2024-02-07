import { Request, Response } from "express";
import UserModel from "../../../../../models/user.model";
import { IUserSchema } from "../../../../../ts/interfaces/user.interface";

class UserGraph {
  private users: Record<string, IUserSchema>;

  constructor() {
    this.users = {};
  }

  async loadUsersFromDatabase() {
    const usersFromDB = await UserModel.find();
    usersFromDB.forEach((user: { referralCode: string | number; toObject: () => IUserSchema; }) => {
      this.users[user.referralCode] = user.toObject();
    });
  }

  async addUser(user_id: string, referralCode: string, referredBy: string | null) {
    // Check if the user is already registered in the graph
  

    // Check if the user is already registered in the database
    // const userInstance = await UserModel.findOne({ referralCode });
    // if (userInstance) {
    //   throw new Error('User with this referral code is already registered.');
    // }

    const level = referredBy && this.users[referredBy] ? this.users[referredBy].level + 1 : 0;

    const user: IUserSchema = {
      user_id,
      is_active: false,
      is_mining: false,
      referralCode,
      referredBy,
      mining_balance:300,
      referredUsers: [],
      level,
      mining_time: 0
    };

    // Save the user to the database
    const newUserInstance = await new UserModel(user).save();

    // Update the in-memory user graph
    this.users[referralCode] = newUserInstance.toObject();

    if (referredBy && this.users[referredBy]) {
      this.users[referredBy].referredUsers.push(referralCode);

      // Update the referredUsers array in the database
      await UserModel.updateOne({ referralCode: referredBy }, { $push: { referredUsers: referralCode } });
    }

    return newUserInstance;
  }

  async getUserByReferralCode(referralCode: string) {
    return await UserModel.findOne({ referralCode });
  }

  async getLevelUsers(referralCode: string, numLevels: number) {
    const user = this.users[referralCode];
    const levelUsers: Record<number, IUserSchema[]> = {};

    const getUsersAtLevel = async (currentUser: IUserSchema, currentLevel: number) => {
      if (currentLevel <= numLevels) {
        if (!levelUsers[currentLevel]) {
          levelUsers[currentLevel] = [];
        }
        levelUsers[currentLevel].push(currentUser);

        for (const code of currentUser.referredUsers) {
          const referredUser = await UserModel.findOne({ referralCode: code });
          if (referredUser) {
            await getUsersAtLevel(referredUser, currentLevel + 1);
          }
        }
      }
    };

    await getUsersAtLevel(user, 0);
    return levelUsers;
  }
}

const userGraph = new UserGraph();
userGraph.loadUsersFromDatabase(); // Load users from the database when the server starts

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const user: IUserSchema = req.body;
    const { user_id, referralCode, referredBy } = user;

    const existuser = await UserModel.findOne({user_id:user_id})
if (existuser) {
  return res.status(409).json({
    message: 'User is already registered!',
  });
}
    // Integrate user registration with the UserGraph
    const newUserInstance = await userGraph.addUser(user_id, referralCode, referredBy);

    return res.status(200).json({
      message: 'User Registration Done!',
      result: newUserInstance,
    });
  } catch (error) {

  
    return res.status(422).json({
      message: 'Fail',
      error,
    });
  }
};
