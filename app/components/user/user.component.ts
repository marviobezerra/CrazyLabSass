import { Component, OnInit } from "@angular/core";

@Component({
    selector: "user",
    templateUrl: "/components/user/user.html",
    styles: [require("./user.scss")]
})
export class UserComponent implements OnInit {

    bricks: any[] = [];
    public Count: number = 0;

    public LoadPost(): void {
        for (let i: number = 0; i < 200; i++) {
            this.Count++;
            this.bricks.push({ title: 'Brick ' + this.Count + " - " + i });
        }
    }

    public ngOnInit(): void {
        this.LoadPost();
    }
}