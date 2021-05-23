import { Message } from "../service/Message";
import { MessageService } from "../service/MessageService";
import { DynamoDB } from "aws-sdk";

export class DynamoMessageRepository implements MessageService {

    private dynamodb: DynamoDB;

    /**
     * Create a MessageService implementation that uses DynamoDB as a backing datasource.
     * 
     * NOTE: Dependency injection of the dynamo client itself has been omitted for time and would be an obvious next step.
     * Recommendation would be to construct the client separately and inject the region, endpoint, and table variables for it based on the lambda environment.
     */
    constructor() {
        this.dynamodb = new DynamoDB({
            region: 'us-west-2',
            endpoint: 'http://dynamodb:8000'
        })
    }

    async getMessages(user: string, sender?: string): Promise<Message[]> {
        let getMessagesRequest: DynamoDB.QueryInput = this.constructQuery(user);

        if(sender){
            getMessagesRequest = this.filterQueryBySender(getMessagesRequest, sender);
        }

        const result = await this.dynamodb.query(getMessagesRequest).promise();
        const items = result.Items?.map(this.constructMessageFromDynamoItem);

        return items ?? [];
    }

    /**
     * Simple function for mapping retrieved dynamo items to a well formed message object.
     * 
     * NOTE: Handling of invalid dynamo items has been omitted for time purposes and would be an obvious next step.
     * 
     * @param value The dynamo item to map
     * @returns A well formed message object
     */
    private constructMessageFromDynamoItem = (value: DynamoDB.AttributeMap): Message => { 
        const item = DynamoDB.Converter.unmarshall(value);
        //TODO: Handle invalid dynamo items.
        return new Message(item.message, item.sender, item.recipient, new Date(item.sentAt));
    };

    /**
     * Construct a query to retrieve up to 100 user messages within the last thirty days.
     * 
     * NOTE: It may be preferred to instead have a messages domain object that handles messsage filtering if the criteria gets much more complex than this.
     * Currently, however, the filter criteria are simple enough to use direct query expressions to handle it.
     * @param user 
     * @returns 
     */
    private constructQuery(user: string) {
        let thirtyDaysAgo = this.getThirtyDaysAgo();
        const getMessagesRequest: DynamoDB.QueryInput = {
            TableName: 'messages',
            KeyConditionExpression: "#recipient = :recipient and #sentAt > :thirtyDaysAgo",
            ExpressionAttributeNames: {
                "#recipient": "recipient",
                "#sentAt": "sentAt"
            },
            ExpressionAttributeValues: {
                ":recipient": {
                    S: user
                },
                ":thirtyDaysAgo": {
                    S: thirtyDaysAgo.toISOString()
                }
            },
            Limit: 100
        };
        return getMessagesRequest;
    }

    /**
     * Add an optional request filter to limit results by sender. 
     * 
     * @param query The query to filter
     * @param sender The sender to filter by
     * @returns A filtered query
     */
    private filterQueryBySender = (query : DynamoDB.QueryInput, sender: string) : DynamoDB.QueryInput => {
        query.FilterExpression = "#sender = :sender";
        query.ExpressionAttributeNames = {
            ...query.ExpressionAttributeNames,
            "#sender": "sender"
        }
        query.ExpressionAttributeValues = {
            ...query.ExpressionAttributeValues,
            ":sender": {
                S: sender
            }
        }

        return query;
    }   

    /**
     * Simple utility function to calculate a date thirty days ago.
     * Simpler than relying on an external library. Should probably be moved to a utiltiy class for independent use and testing.
     * @returns A date thirty days prior to today.
     */
    private getThirtyDaysAgo = (): Date => {
        let today = new Date();
         
        return new Date(today.setDate(today.getDate() - 30));;
    }

    async sendMessage(message: Message): Promise<void> {
        const item = DynamoDB.Converter.marshall(message);
        item.sentAt = {
            S: message.sentAt.toISOString()
        }

        const sendMessageRequest: DynamoDB.PutItemInput = {
            TableName: 'messages',
            Item: item
        }

        await this.dynamodb.putItem(sendMessageRequest).promise();
    }

}