import { Component } from "@angular/core";

@Component({
	selector: "home",
    templateUrl: "/components/home/home.html",
    styles: [require("./home.scss")]
})
export class HomeComponent {
    constructor() {
    }

    public Change(): void {
        console.log("Run");
        this.Aux = !this.Aux;
        this.Icon1 = this.Aux ? "amazon" : "apple";
        this.Icon2 = !this.Aux ? "amazon" : "apple";
    }

    public Aux: boolean = true;

    public Icon1: string = "amazon";
    public Icon2: string = "apple";
    public Icon3: string = "facebook-box";
    public Icon4: string = "facebook-messenger";
    public Icon5: string = "facebook";
    public Icon6: string = "github-box";
}