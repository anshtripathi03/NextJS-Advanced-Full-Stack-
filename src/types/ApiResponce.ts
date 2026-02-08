import { Message } from "../models/userModel";

export interface ApiResponce{
    success: boolean,
    message: string,
    status: number,
    messages?: Array<Message>,
    isAcceptingMessage?: boolean
}