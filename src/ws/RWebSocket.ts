import * as WS from 'html5-websocket';
import * as RWS from 'reconnecting-websocket';

export default class RWebSocket{

    private websocket: any;

    constructor(url: string){
        this.websocket = new RWS(url, undefined, {constructor: WS});
    }

    onOpen(fun: (() => void)){
        this.websocket["onopen"] = fun;
    }

    onMessage(fun: ((any) => void)){
        this.websocket["onmessage"] = fun;
    }

    onError(fun: ((err) => void)){
        this.websocket["onerror"] = fun;
    }

    onClose(fun: (() => void)){
        this.websocket["onclose"] = fun;
    }

    send(arg: string){
        this.websocket["send"](arg);
    }

    close(code: number = 1000, reason: string = '', params: any = {}){
        this.websocket["close"](code, reason, params);
    }
}