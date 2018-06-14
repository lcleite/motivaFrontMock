import {ViewPage} from "./ViewPage";
import RWebSocket from "../ws/RWebSocket";
import {WsMessage, WsMessageAction} from "../ws/WsMessage";
import {WsMessageHandler} from "../ws/WsMessageHandler";

export class MainViewPage extends ViewPage{
    private token: string;

    private buttonLike: JQuery;

    constructor(){
        super();
        this.url = "view/main.html";
    }

    onLoad(data: any) {
        if(data){
            this.token = data.token;
        }

        this.buttonLike = this.getElementById("buttonLike");
        this.setClickListener(this.buttonLike, () => this.processLike());
    }

    onReturn(data: any) {
        console.log("onReturn");
    }

    private processLike() {
        console.log("Like");

        let postId = 2;
        console.log(this.token);

        $.ajax({
            url: "http://localhost:8000/app/post/" + postId + "/like",
            type: 'post',
            dataType: 'json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader ("Authorization", "Bearer " + this.token);
            },
            success: (data) => {
                console.log(data);
            },
            error: (data) =>{
                console.log(data);
            }
        });
    }
}