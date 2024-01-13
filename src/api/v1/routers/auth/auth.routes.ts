import express from "express";
import { userRegistration } from "../../controllers/auth/registration/userRegistration.controller";
import { userLogin } from "../../controllers/auth/login/userLogin";

const router = express.Router();

router.route("/registration").post(userRegistration);
router.route("/login").post(userLogin);

module.exports = router;
