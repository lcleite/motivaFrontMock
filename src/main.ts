import {App} from "./app/App";
// import {WsApp} from "./ws/WsApp";
import {LoginViewPage} from "./viewpage/LoginViewPage";

let loginPage = new LoginViewPage();

App.setMainPage(loginPage);
App.run();

// let web = new WsApp();
// web.start();