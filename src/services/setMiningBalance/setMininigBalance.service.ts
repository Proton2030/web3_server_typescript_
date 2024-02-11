import UserModel from "../../models/user.model"

export const setMiningBalance = async () => {
    const userList = await UserModel.find({is_mining:true}).lean();
    console.log("userList",userList);
    const updatedUserList =[];
    for (let user of userList){
        const timeDiff = Math.floor(new Date().getTime() / (1000 * 60 * 60)) - Math.floor(user.mining_time / (1000 * 60 * 60));
        if(timeDiff>=3){
            updatedUserList.push(
                {
                    updateMany: {
                      filter: {_id:user._id}, // Add your filter criteria if needed
                      update: { 
                        $set: 
                            { 
                                is_mining: false,  
                                mining_time:0
                            } 
                            ,
                        $inc:{
                            mining_balance:0.01
                        }
                        }, 
                    },
                }
            )
        }
    }
    console.log("user details",updatedUserList);
    if (updatedUserList.length > 0) {
        await UserModel.bulkWrite(updatedUserList);
    }

}