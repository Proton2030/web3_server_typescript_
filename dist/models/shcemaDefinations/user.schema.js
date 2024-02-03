"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const UserSchema = new mongoose_1.Schema({
    user_id: model_constant_1.default.requiredString,
    is_active: model_constant_1.default.requiredBoolean
}, schemaOption_1.GENERAL_SCHEMA_OPTIONS);
exports.default = UserSchema;
