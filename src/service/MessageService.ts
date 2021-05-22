import { Message } from "./Message";

export interface MessageService {

    getMessages(user : string, sender?: string) : Promise<Array<Message>>;

    sendMessage(message: Message) : Promise<void>;

}