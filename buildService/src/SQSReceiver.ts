import  amqplib from 'amqplib';
require('dotenv').config()

export default class SQSReceiver{
    private readonly queue:string;
    private readonly amqLibHost:string;
    private channel :any;
    public static rabbitMQ:SQSReceiver | null = null;

    private constructor() {
        this.queue = process.env.QUEUE || '';
        this.amqLibHost = process.env.QUEUE_HOST || '';
    }
    public static async getInstance() : Promise<SQSReceiver> {
        if(!SQSReceiver.rabbitMQ){
            SQSReceiver.rabbitMQ= new SQSReceiver();
            await SQSReceiver.rabbitMQ.initializeQueue();
        }
        return SQSReceiver.rabbitMQ;
    }
    private async initializeQueue(){
        try{
            const connection = await amqplib.connect(this.amqLibHost);
            const channel  =await  connection.createChannel();
            await channel.assertQueue(this.queue,{durable:false});
            this.channel = channel;
        }catch (err){
            throw new Error('Error in connecting with Queue')
        }
    }
    public async receiveMessage(callback:Function){
        return await this.channel.consume(this.queue, async (msg: any) => {
            const message = msg.content.toString();
            console.log('Message received from Queue',message);
            callback && await callback(message);
            await this.channel.ack(msg)
            return message;
        });
    }

}