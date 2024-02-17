"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deploy_controller_1 = require("../controller/deploy.controller");
const router = express_1.default.Router();
router.route('/').post(deploy_controller_1.handleDeploy);
exports.default = router;
