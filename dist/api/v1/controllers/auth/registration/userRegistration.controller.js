"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistration = void 0;
const user_model_1 = __importDefault(require("../../../../../models/user.model"));
const userRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const userInstance = yield user_model_1.default.findOne({ user_id: user.user_id });
        if (userInstance) {
            return res.status(409).json({
                message: "user is already registered!"
            });
        }
        else {
            const UserInstance = yield new user_model_1.default(user).save();
            return res.status(200).json({
                message: "User Registration Done!",
                result: UserInstance
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(422).json({
            message: "fail",
            error
        });
    }
});
exports.userRegistration = userRegistration;
