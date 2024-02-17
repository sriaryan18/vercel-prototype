"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deployService = void 0;
const generateRandomId_1 = __importDefault(require("../utils/generateRandomId"));
const simple_git_1 = __importDefault(require("simple-git"));
const getAllFilePaths_1 = require("../utils/getAllFilePaths");
const path = __importStar(require("path"));
const rabbitmq_1 = __importDefault(require("../utils/rabbitmq"));
function deployService(reqBody) {
    return __awaiter(this, void 0, void 0, function* () {
        const { repoUrl } = reqBody;
        const randomId = (0, generateRandomId_1.default)(repoUrl);
        const completePathArray = __dirname.split('/');
        completePathArray.splice(completePathArray.length - 2, 2);
        const outDir = `${process.env.OUTPUT_DIR}/${randomId}`;
        const completePath = path.join(completePathArray.join('/'), outDir);
        yield (0, simple_git_1.default)().clone(repoUrl, completePath);
        const queue = yield rabbitmq_1.default.getInstance();
        const filePaths = (0, getAllFilePaths_1.getAllFilePaths)(completePath);
        // upload the files to Object Store
        for (const file of filePaths) {
            const destinationPath = (0, getAllFilePaths_1.getDestinationPaths)(file, randomId);
            // await uplodFileToR2(destinationPath,file);
        }
        yield queue.sendMessage(randomId);
        return randomId;
    });
}
exports.deployService = deployService;
