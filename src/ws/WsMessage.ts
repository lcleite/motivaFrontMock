
export enum WsMessageAction {
    CONNECT = 0,
    NOTIFICATION = 1,
    USER = 2
}

export class WsMessage{
    public channel: string;
    public action: number;
    public data: any;
}