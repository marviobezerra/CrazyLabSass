import { Component, OnInit } from "@angular/core";

@Component({
    selector: "layout",
    templateUrl: "./layout/layout.html",
    styles: [require("./layout.scss")]
})
export class LayoutComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
