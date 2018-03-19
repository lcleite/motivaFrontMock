
import * as WS from 'html5-websocket';
import * as RWS from 'reconnecting-websocket';
import RWebSocket from "./RWebSocket";

export class WsApp {

    start() {
        let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        // let chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/ws/login/");

        // const rws = new RWS(ws_scheme + "://localhost:8000/ws/login/", undefined, {constructor: WS});
        //
        // rws["onopen"] = () =>
        //     rws["send"]('hello');
        //
        // rws["onmessage"] = (e) => {
        //     console.log(e.data);
        // };
        // rws.close(0, 'bye', {keepClosed: true});


        let recWebSocket = new RWebSocket(ws_scheme + "://localhost:8000/ws/login/");

        recWebSocket.onOpen(() => {
            recWebSocket.send("hello");
        });

        recWebSocket.onMessage((message) => {
            console.log(message.data);
            recWebSocket.close(1000, 'bye', {keepClosed: true});
        });

        recWebSocket.onClose(() => {
            console.log("Closed");
        });

        recWebSocket.onError((err) => {
            console.log("Error");
            console.log(err);
        });

        let user: any = {};
        user.username = "lcleite";
        user.password = "123456";
        //
        // chatsock.onopen = function(){
        //     chatsock.send(JSON.stringify(user));
        // };

        $.ajax({
            url: "http://localhost:8000/app/login/",
            type: 'post',
            dataType: 'json',
            data: user,
            success: (data) => {
                console.log(data);
            },
            error: (data) =>{
                console.log(data);
            }
        });
    }
}