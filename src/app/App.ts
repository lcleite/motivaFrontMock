import {ViewPage} from "../viewpage/ViewPage";
export abstract class App{

    private static mainPage: ViewPage;
    private static stack: Array<ViewPage> = [];
    private static state: Map<ViewPage,string> = new Map();
    private static content: JQuery = $("#content");

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

