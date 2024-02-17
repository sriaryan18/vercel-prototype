import SQSReceiver from "./SQSReceiver";
import {processMessage} from "./utils/processMessage";


(async ()=>{
    const queue = await SQSReceiver.getInstance();
    await queue.receiveMessage(processMessage);
})()
