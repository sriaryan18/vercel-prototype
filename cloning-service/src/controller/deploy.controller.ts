import express from "express";
import {deployService} from "../services/deploy.service";

export async function handleDeploy(req : express.Request,res:express.Response){
    const data = req?.body?.repoUrl;
    console.log(data,req.body);
    const id = await  deployService(req.body);
    return res.json({id});
}