import { Component, OnInit, ElementRef } from "@angular/core";

@Component({
    selector: "user",
    templateUrl: "/components/user/user.html",
    styles: [require("./user.scss")]
})
export class UserComponent implements OnInit {

    public Posts: any[] = [];
    public Count: number = 0;

    public LoadPosts(): void {
        for (let i = 0; i < 40; i++) {
            let post = this.CreateFakePost();
            this.Posts.push(post);
        }
    }

    private CreateFakePost(): any {
        this.Count++;
        let type: number = Math.floor(Math.random() * 2) + 1;

        return {
            Visible: false,
            Id: this.Count,
            Type: type,
            CssClass: type === 2 && this.Count > 1 ? "large" : "",
            Color: '#' + Math.random().toString(16).substr(-6),
            Text: "OK"
        };
    }

    public ngOnInit(): void {
        this.LoadPosts();
    }
}