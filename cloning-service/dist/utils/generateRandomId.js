"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUsernameFromRepo_1 = __importDefault(require("./getUsernameFromRepo"));
const uuid_1 = require("uuid");
function generateRandomId(salt) {
    const username = (0, getUsernameFromRepo_1.default)(salt);
    return `${username}_${(0, uuid_1.v4)()}`;
}
exports.default = generateRandomId;
