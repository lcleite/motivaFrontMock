
import {WsMessage} from "./WsMessage";

export class WsMessageJsonSerializer{

    toJson(message: WsMessage): string{
        return JSON.stringify(message);
    }

    toObject(jsonString: string): WsMessage{
        let message = new WsMessage();
        let jsonObject: any = JSON.parse(jsonString);

        message.channel = jsonObject.channel;
        message.action = jsonObject.action;
        message.data = jsonObject.data;

        return message;
    }

}