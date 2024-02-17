"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
const deploy_routes_1 = __importDefault(require("./routes/deploy.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/deploy', deploy_routes_1.default);
app.listen(process.env.PORT, () => console.log(`Server Started at port ${process.env.PORT}`));
