"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegistration_controller_1 = require("../../controllers/auth/registration/userRegistration.controller");
const router = express_1.default.Router();
router.route("/registration").post(userRegistration_controller_1.userRegistration);
module.exports = router;
