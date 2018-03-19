import {ViewPage} from "./ViewPage";
import {App} from "../app/App";
import {MainViewPage} from "./MainViewPage";

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
            url: "http://localhost:8000/app/login/",
            type: 'post',
            dataType: 'json',
            data: data,
            success: (data) => {
                console.log(data);
                App.push(new MainViewPage(), data);
            },
            error: (data) =>{
                console.log(data);
                alert("Erro ao logar!");
            }
        });
    }
}