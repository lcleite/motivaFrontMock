import {ViewPage} from "./ViewPage";
import RWebSocket from "../ws/RWebSocket";

export class MainViewPage extends ViewPage{
    private username: string;

    private buttonLike: JQuery;

    constructor(){
        super();
        this.url = "view/main.html";
    }

    onLoad(data: any) {
        if(data){
            this.username = data.username;
        }

        this.buttonLike = this.getElementById("buttonLike");
        this.setClickListener(this.buttonLike, () => this.processLike());

        let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        let recWebSocket = new RWebSocket(ws_scheme + "://localhost:8000/ws/login/");

        let messageData: any = {};
        messageData.action = "connect";
        messageData.data = {};
        messageData.data.username = this.username;

        recWebSocket.onOpen(() => {
            recWebSocket.send(JSON.stringify(messageData));
        });

        recWebSocket.onMessage((message) => {
            console.log("MESSAGE");
            console.log(message.data);
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