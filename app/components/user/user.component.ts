import { Component } from "@angular/core";

@Component({
    selector: "user",
    templateUrl: "/components/user/user.html",
    styles: [require("./user.scss")]
})
export class UserComponent {
    public Message: string = "Teste";
}