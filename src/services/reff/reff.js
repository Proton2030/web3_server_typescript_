class UserGraph {
  constructor() {
    this.users = {};
  }
  addUser(username, referralCode, referredBy) {
    const user = {
      username,
      referralCode,
      referredBy,
      referredUsers: [],
      level: referredBy ? this.users[referredBy].level + 1 : 0,
    };
    this.users[referralCode] = user;
    if (referredBy) {
      this.users[referredBy].referredUsers.push(referralCode);
    }
  }
  getUserByReferralCode(referralCode) {
    return this.users[referralCode];
  }
  getLevelUsers(referralCode, numLevels) {
    const user = this.users[referralCode];
    const levelUsers = {};

    const getUsersAtLevel = (currentUser, currentLevel) => {
      if (currentLevel <= numLevels) {
        if (!levelUsers[currentLevel]) {
          levelUsers[currentLevel] = [];
        }
        levelUsers[currentLevel].push(currentUser);
        currentUser.referredUsers.forEach(code => {
          getUsersAtLevel(this.users[code], currentLevel + 1);
        });
      }
    };
    getUsersAtLevel(user, 0);
    return levelUsers;
  }
}
export const userGraph = new UserGraph();

userGraph.addUser('User1', 'ABC123', null);
userGraph.addUser('User2', 'DEF456', 'ABC123');
userGraph.addUser('User3', 'GHI789', 'DEF456');
userGraph.addUser('User4', 'JKL012', 'DEF456');
userGraph.addUser('User5', 'MNO345', 'GHI789');
userGraph.addUser('User6', 'MNO385', 'GHI789');
userGraph.addUser('User7', 'MNO395', 'MNO385');

const user2Info = userGraph.getUserByReferralCode('ABC123');
const levelUsers = userGraph.getLevelUsers('ABC123', 4);

console.log('User1 Information:', user2Info);
for (let level = 1; level <= 4; level++) {
  console.log(`Level ${level} Users for User1:`, levelUsers[level] || []);
}
