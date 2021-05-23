import { v4 as uuid } from "uuid";
import fetch from "node-fetch";
import { Message } from "../../src/service/Message";

jest.setTimeout(20000)
describe("Happy path message tests", () => {
    let recipientId : string;
    let senderIds : string[];
    let messageUri : string;

    beforeAll(() => {
        recipientId = uuid();
        senderIds = [uuid(), uuid()];
        messageUri = `${global.basePath}/users/${recipientId}/messages`;
    });

    it("Can send and retrieve message to user", async () => {
        const message = {
            sender: senderIds[0],
            message: "I am a test message"
        }
        const sendResult = await fetch(messageUri, {
            method: "POST",
            body: JSON.stringify(message)
        });

        const retrieveResult = await fetch (messageUri, {
            method: "GET"
        });

        expect(sendResult.status).toEqual(200);
        expect(retrieveResult.status).toEqual(200);

        const retrieve : Array<Message> = await retrieveResult.json();
        const send : Message = await sendResult.json();

        expect(retrieve).toHaveLength(1);
        expect(retrieve[0]).toMatchObject(send);
    });

    it("Can filter messages by sender", async () => {
        let filteredMessageUri = `${messageUri}?sender=${senderIds[1]}`
        const message = {
            sender: senderIds[1],
            message: "I am a second test message"
        }
        const sendResult = await fetch(messageUri, {
            method: "POST",
            body: JSON.stringify(message)
        });

        const retrieveResult = await fetch (filteredMessageUri, {
            method: "GET"
        });

        expect(sendResult.status).toEqual(200);
        expect(retrieveResult.status).toEqual(200);

        const retrieve : Array<Message> = await retrieveResult.json();
        const send : Message = await sendResult.json();

        expect(retrieve).toHaveLength(1);
        expect(retrieve[0]).toMatchObject(send);
    });
});