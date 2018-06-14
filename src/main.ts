import {App} from "./app/App";
import {LoginViewPage} from "./viewpage/LoginViewPage";

let page = new LoginViewPage();

App.setMainPage(page);
App.run();
App.connectToWebsocket();