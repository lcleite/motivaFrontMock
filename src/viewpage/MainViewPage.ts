import {ViewPage} from "./ViewPage";
import RWebSocket from "../ws/RWebSocket";
import {WsMessage, WsMessageAction} from "../ws/WsMessage";
import {WsMessageHandler} from "../ws/WsMessageHandler";

export class MainViewPage extends ViewPage{

    private messageHandler: WsMessageHandler;

    private username: string;

    private buttonLike: JQuery;

    constructor(){
        super();
        this.url = "view/main.html";
        this.messageHandler = new WsMessageHandler();
    }

    onLoad(data: any) {
        if(data){
            this.username = data.username;
        }

        this.buttonLike = this.getElementById("buttonLike");
        this.setClickListener(this.buttonLike, () => this.processLike());

        let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        let recWebSocket = new RWebSocket(ws_scheme + "://localhost:8000/ws/login/");

        let messageData = new WsMessage();
        messageData.action = WsMessageAction.CONNECT;
        messageData.data = "Hello";
        messageData.channel = this.username;

        recWebSocket.onOpen(() => {
            recWebSocket.send(JSON.stringify(messageData));
        });

        recWebSocket.onMessage((message) => {
            console.log("MESSAGE");
            this.messageHandler.receive(message.data);
        });

        recWebSocket.onClose(() => {
            console.log("Closed");
        });

        recWebSocket.onError((err) => {
            console.log("Error");
            console.log(err);
        });
    }

    onReturn(data: any) {
        console.log("onReturn");
    }

    private processLike() {
        console.log("Like");
        console.log(this.username);

        let data: any = {};
        data.user_id = 1;
        data.post_id = 4;

        $.ajax({
            url: "http://localhost:8000/app/post/add/like",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(data),
            success: (data) => {
                console.log(data);
            },
            error: (data) =>{
                console.log(data);
            }
        });
    }
}