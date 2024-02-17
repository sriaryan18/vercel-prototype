import {checkStatus} from "../model/Status";
import express from "express";

export default async function checkStatusService(req:express.Request,res:express.Response){
    const hash = req.params['hash'];
    const row = await checkStatus(hash);
    console.log('status',row)
    if(row.status === 'deploy'){
        res.status(200);
    }else {
        res.status(202)
    }
    res.send(row);
}