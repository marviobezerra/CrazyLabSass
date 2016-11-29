import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "user-view",
    templateUrl: "/components/user/user-view.html",
    styles: [require("./user-view.scss")]
})
export class UserViewComponent implements OnInit {
    constructor() {
    }

    @Input("Top") Top: string;
    @Input("Left") Left: string;
    @Input("Animation") Animation: string;
    @Input("Direction") Direction: string;

    public ngOnInit(): void {
    }
}