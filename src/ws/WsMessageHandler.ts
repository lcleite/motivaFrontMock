
import {WsMessage, WsMessageAction} from "./WsMessage";
import {WsMessageJsonSerializer} from "./WsMessageJsonSerializer";

export class WsMessageHandler{

    private serializer: WsMessageJsonSerializer = new WsMessageJsonSerializer();

    receive(message: any){
        let messageData = this.serializer.toObject(message);

        if (messageData.action == null)
            return; //FIXME: throw error

        switch (messageData.action){
            case WsMessageAction.CONNECT.valueOf():
                this.receiveConnection(messageData);
                break;
            case WsMessageAction.NOTIFICATION.valueOf():
                this.receiveNotification(messageData);
                break;
            case WsMessageAction.USER.valueOf():
                break;
        }
    }

    private receiveConnection(message: WsMessage) {
        console.log("receiveConnection()");
        console.log(message);
    }

    private receiveNotification(message: WsMessage){
        console.log("receiveNotification()");
        console.log(message);
    }
}