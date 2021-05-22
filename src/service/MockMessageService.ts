import { Message } from "./Message";
import { MessageService } from "./MessageService";

export class MockMessageService implements MessageService {
    sendMessage = async (_message: Message): Promise<void> => {}

    getMessages =  async (user: string, sender?: string): Promise<Message[]> => {
        return [ new Message("Hello World!", user, sender ? sender : "Bob") ];
    }

}