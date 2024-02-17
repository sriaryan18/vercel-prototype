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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeploy = void 0;
const deploy_service_1 = require("../services/deploy.service");
function handleDeploy(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const data = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.repoUrl;
        console.log(data, req.body);
        const id = yield (0, deploy_service_1.deployService)(req.body);
        return res.json({ id });
    });
}
exports.handleDeploy = handleDeploy;
