import { Component } from "@angular/core";

@Component({
    selector: "layout",
    templateUrl: "/components/layout/layout.html",
    styles: [require("./layout.scss")]
})
export class LayoutComponent {
    constructor() {
        alert("OK");
     }
}