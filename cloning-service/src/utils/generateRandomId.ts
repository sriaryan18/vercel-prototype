import getUsernameFromRepo from "./getUsernameFromRepo";
import { v4 as uuidv4 } from 'uuid';
export default function generateRandomId(salt : string){
    const username = getUsernameFromRepo(salt);
    return `${username}_${uuidv4()}`
}