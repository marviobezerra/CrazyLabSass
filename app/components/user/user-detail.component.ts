import { Component, Input } from "@angular/core";

@Component({
    selector: "user-detail",
    templateUrl: "/components/user/user-detail.html",
    styles: [require("./user-detail.scss")]
})
export class UserDetailComponent {
    public IsVisible: boolean = false;

    @Input("Brick") public Brick: any;
}