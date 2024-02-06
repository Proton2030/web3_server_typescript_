import express from "express";
import { userRegistration } from "../../controllers/auth/registration/userRegistration.controller";
import { findUserByUserId } from "../../controllers/auth/registration/userdetails";
import { updateUserMiningStatus } from "../../controllers/mining";
import { ActiveAccount } from "../../controllers/active_acount";

const router = express.Router();

router.route("/registration").post(userRegistration);
router.route("/getuser-byid/:user_id").get(findUserByUserId);
router.route("/startMining/:user_id").put(updateUserMiningStatus);
router.route("/activeuser/:user_id").put(ActiveAccount);

module.exports = router;
