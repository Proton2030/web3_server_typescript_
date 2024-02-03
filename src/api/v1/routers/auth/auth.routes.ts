import express from "express";
import { userRegistration } from "../../controllers/auth/registration/userRegistration.controller";
import { findUserByUserId } from "../../controllers/auth/registration/userdetails";

const router = express.Router();

router.route("/registration").post(userRegistration);
router.route("/getuser-byid/:user_id").get(findUserByUserId);



module.exports = router;
