import amqlib from 'amqplib';

require('dotenv').config();

export default class SQS {
    private readonly queue:string;
    private readonly amqLibHost:string;
    private channel :any;
    public static rabbitMQ:SQS | null = null;

    private constructor() {
        this.queue = process.env.QUEUE || '';
        this.amqLibHost = process.env.QUEUE_HOST || '';
    }
    public static async getInstance() : Promise<SQS> {
        if(!SQS.rabbitMQ){
            SQS.rabbitMQ= new SQS();
            await SQS.rabbitMQ.initializQueue();
        }
        return SQS.rabbitMQ;
    }
    private async initializQueue(){
        try{
            const connection = await amqlib.connect(this.amqLibHost);
            const channel  =await  connection.createChannel();
            await channel.assertQueue(this.queue,{durable:false});
           this.channel = channel;
        }catch (err){
            throw new Error('Error in connecting with Queue')
        }
    }
    public async sendMessage(message:string){
        console.log('I am message');
        this.channel.sendToQueue(this.queue,Buffer.from(message));
    }

}