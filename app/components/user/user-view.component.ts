import { Component, OnInit } from "@angular/core";

import { IPosition } from "../../directives";

@Component({
    selector: "user-view",
    templateUrl: "/components/user/user-view.html",
    styles: [require("./user-view.scss")]
})
export class UserViewComponent implements OnInit {

    constructor() {

    }

    public Show = (position: IPosition) => {
        this.IsVisible = true;

        let top: number = position.Top + window.pageYOffset - 45;
        let left: number = position.Left + position.Width + window.pageXOffset;
        this.Direction = "left";

        if ((top + this.Height) > (window.innerHeight + window.pageYOffset)) {
            top = top - this.Height;
            left = position.Left + window.pageXOffset;
            this.Direction = "botton";
        }

        if ((left + this.Width) > window.innerWidth) {
            left = left - position.Width - this.Width;
            this.Direction = "right";
        }

        this.Top = top.toString() + "px";
        this.Left = left.toString() + "px";
    }

    public Direction: string = "up";
    public Left: string;
    public Top: string;
    public IsVisible: boolean = true;
    public Height: number = 350;
    public Width: number = 200;

    public ngOnInit(): void {
        this.IsVisible = false;
    }
}