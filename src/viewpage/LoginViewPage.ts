import {ViewPage} from "./ViewPage";
import {App} from "../app/App";
import {MainViewPage} from "./MainViewPage";
import {WsMessageHandler} from "../ws/WsMessageHandler";
import {WsMessage, WsMessageAction} from "../ws/WsMessage";
import RWebSocket from "../ws/RWebSocket";

export class LoginViewPage extends ViewPage{
    private passwordInput: JQuery;
    private usernameInput: JQuery;
    private buttonOk: JQuery;

    constructor(){
        super();
        this.url = "view/login.html";
    }

    onLoad(data: any) {
        this.usernameInput = this.getElementById("usernameInput");
        this.passwordInput = this.getElementById("passwordInput");

        this.buttonOk = this.getElementById("buttonOk");
        this.setClickListener(this.buttonOk, () => this.goToMain());
    }

    onReturn(data: any) {
        console.log(data);
    }

    goToMain(){
        let data = {
            username: this.usernameInput.val(),
            password: this.passwordInput.val()
        };

        $.ajax({
            url: "http://localhost:8000/app/v1/login",
            type: 'post',
            dataType: 'json',
            data: data,
            success: (data) => {
                console.log("Logged In");
                console.log(data);
                this.sendConnectMessage(data);
                App.push(new MainViewPage(), data.result);
            },
            error: (data) =>{
                console.log(data);
                alert("Erro ao logar!");
            }
        });
    }

    private sendConnectMessage(data: any) {
        let message = new WsMessage();

        message.action = WsMessageAction.CONNECT;
        message.data = "Logged In";
        message.channel = data.result.username;

        App.websocket.send(JSON.stringify(message));
    }
}