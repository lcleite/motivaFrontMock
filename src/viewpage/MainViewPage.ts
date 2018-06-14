import {ViewPage} from "./ViewPage";

export class MainViewPage extends ViewPage{
    private token: string;

    private posts: JQuery;

    constructor(){
        super();
        this.url = "view/main.html";
    }

    onLoad(data: any) {
        if(data){
            this.token = data.token;
        }

        this.posts = this.getElementById("posts");
        this.getAllPosts();
    }

    onReturn(data: any) {
        console.log("onReturn");
    }

    private getAllPosts() {
        console.log("Get All Posts");

        $.ajax({
            url: "http://localhost:8000/app/v1/post",
            type: 'get',
            dataType: 'json',
            beforeSend: (xhr) => {
                xhr.setRequestHeader ("Authorization", "Bearer " + this.token);
            },
            success: (data) => {
                let posts = JSON.parse(data.result.posts);
                console.log(posts);
                this.showPosts(posts);
            },
            error: (data) =>{
                console.log(data);
            }
        });
    }

    private showPosts(posts: any[]) {
        for(let post of posts) {
            this.posts.append("<div>");
            this.posts.append("<span> "+ post.author.username + " - " + post.title +"</span>");
            this.posts.append("<button id=" + post.id + "> Like </button>");
            this.posts.append("</div>");

            this.setClickListener(this.getElementById(post.id), () => this.processLike(post.id));
        }
    }

    private processLike(id: string) {
        console.log("Like " + id);
        console.log(this.token);

        $.ajax({
            url: "http://localhost:8000/app/post/" + id + "/like",
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