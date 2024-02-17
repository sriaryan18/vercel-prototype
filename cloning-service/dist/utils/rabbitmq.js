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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
require('dotenv').config();
class SQS {
    constructor() {
        this.queue = process.env.QUEUE || '';
        this.amqLibHost = process.env.QUEUE_HOST || '';
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!SQS.rabbitMQ) {
                SQS.rabbitMQ = new SQS();
                yield SQS.rabbitMQ.initializQueue();
            }
            return SQS.rabbitMQ;
        });
    }
    initializQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield amqplib_1.default.connect(this.amqLibHost);
                const channel = yield connection.createChannel();
                yield channel.assertQueue(this.queue, { durable: false });
                this.channel = channel;
            }
            catch (err) {
                throw new Error('Error in connecting with Queue');
            }
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('I am message');
            this.channel.sendToQueue(this.queue, Buffer.from(message));
        });
    }
}
SQS.rabbitMQ = null;
exports.default = SQS;
