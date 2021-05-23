import { Message } from "./Message";

export interface MessageService {

    /**
     * Retrieve messages for a given user.
     * 
     * @param user The user whose messages you wish to recieve
     * @param sender An optional filter by who sent the message
     */
    getMessages(user : string, sender?: string) : Promise<Array<Message>>;

    /**
     * Send a message from one user to another.
     * 
     * @param message The message to send.
     */
    sendMessage(message: Message) : Promise<void>;

}