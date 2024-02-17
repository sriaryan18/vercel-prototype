import express, {Router} from "express";
import {handleDeploy} from "../controller/deploy.controller";
const router:Router = express.Router();
router.route('/').post(handleDeploy);
export default router;