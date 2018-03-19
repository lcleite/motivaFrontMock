import {ViewPage} from "./ViewPage";

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
    }

    onReturn(data: any) {
        console.log("onReturn");
    }

    private processLike() {
        console.log("Like");
        console.log(this.username);
    }
}