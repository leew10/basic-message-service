export class Message {
    public sentAt : Date;

    constructor(public message : string, public sender : string, public recipient : string, sentAt?: Date){
        this.sentAt = sentAt ?? new Date();
    }
}