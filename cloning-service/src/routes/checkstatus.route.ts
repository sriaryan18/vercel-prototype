import express from "express";
import checkStatusService from "../services/status.service";
const checkStatusRouter = express.Router();

checkStatusRouter.route('/:hash').get(checkStatusService)
export default checkStatusRouter;