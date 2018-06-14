import {ViewPage} from "../viewpage/ViewPage";
import RWebSocket from "../ws/RWebSocket";
import {WsMessageHandler} from "../ws/WsMessageHandler";
import {WsMessageAction} from "../ws/WsMessage";
export abstract class App{

    private static mainPage: ViewPage;
    private static stack: Array<ViewPage> = [];
    private static state: Map<ViewPage,string> = new Map();
    private static content: JQuery = $("#content");

    private static messageHandler: WsMessageHandler;
    public static websocket: RWebSocket;

    static connectToWebsocket() {
        let wsScheme = window.location.protocol == "https:" ? "wss" : "ws";
        App.messageHandler = new WsMessageHandler();
        App.websocket = new RWebSocket(wsScheme + "://localhost:8000/ws/login/");

        App.websocket.onMessage((message) => {
            console.log("MESSAGE");
            let receivedMessage = App.messageHandler.receive(message.data);

            if (receivedMessage.action == WsMessageAction.NOTIFICATION.valueOf()) {
                App.mainPage.showNotification(receivedMessage.data.text);
            }
        });

        App.websocket.onClose(() => {
            console.log("Closed");
        });

        App.websocket.onError((err) => {
            console.log("Error");
            console.log(err);
        });
    }

    static run(){
        App.request(App.mainPage, null);
    }

    static setMainPage(page: ViewPage){
        App.mainPage = page;
        App.stack.push(page);
    }

    static push(page: ViewPage, data: any){
        let pageNow = App.stack[App.stack.length-1];
        App.saveState(pageNow, App.content.html());

        App.stack.push(page);
        App.request(page, data);
    }

    static pop(data: any){
        let page = App.stack.pop();
        App.deleteState(page);
        page.onExit();
        App.requestPop(data);
    }

    private static request(page: ViewPage, data: any){
        $.ajax({
            url: page.url,
            data: data,
            type: "GET",
            success: (response) => {
                App.content.html(response);
                page.onLoad(data);
            },
            error: (xhr, desc, err) => {
                console.log(desc);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    }

    private static requestPop(data: any){
        let page = App.stack[App.stack.length-1];

        $.ajax({
            url: page.url,
            data: data,
            type: "GET",
            success: (response) => {
                App.content.html(response);
                page.onReturn(data);
            },
            error: (xhr, desc, err) => {
                console.log(desc);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    }

    private static saveState(page: ViewPage, htmlContent: string){
        App.state.set(page, htmlContent);
    }

    private static getState(page: ViewPage): string{
        return App.state.get(page);
    }

    private static deleteState(page: ViewPage){
        App.state.delete(page);
    }
}

