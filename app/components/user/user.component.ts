import { Component, OnInit, ElementRef } from "@angular/core";
import { IPosition } from "../../directives";
import { UserDetailComponent } from "./";

@Component({
    selector: "user",
    templateUrl: "/components/user/user.html",
    styles: [require("./user.scss")]
})
export class UserComponent implements OnInit {

    public Bricks: any[] = [];
    public Count: number = 0;
    public IsViewDetail: boolean = false;

    public Direction: string;
    public Animation: string;
    public Left: string;
    public Top: string;

    //TODO: Remove
    public Height: number = 350;
    public Width: number = 200;

    public CurrentId: number = -1;
    public CurrentReference: UserDetailComponent;

    public LoadPost(): void {
        for (let i: number = 0; i < 20; i++) {
            this.Count++;
            this.Bricks.push({ id: this.Count, title: 'Brick ' + this.Count + " - " + i });
        }
    }

    public ShowDetail = (reference: UserDetailComponent, position: IPosition) : void => {
        this.CurrentReference = reference;
        
        this.IsViewDetail = true;
        this.CurrentReference.IsVisible = true;
        this.CurrentId = this.CurrentReference.Brick.id;

        let top: number = position.Top + window.pageYOffset - 45;
        let left: number = position.Left + position.Width + window.pageXOffset;
        let animation = "fadeInRight";
        this.Direction = "left";

        if ((top + this.Height) > (window.innerHeight + window.pageYOffset)) {
            top = top - this.Height;
            left = position.Left + window.pageXOffset;
            this.Direction = "botton";
            animation = "fadeInDown";
        }

        if ((left + this.Width) > window.innerWidth) {
            left = left - position.Width - this.Width;
            this.Direction = "right";
            animation = "fadeInLeft";
        }

        this.Top = top.toString() + "px";
        this.Left = left.toString() + "px";
        this.Animation = animation;
    }

    public HideDetail = (): void =>  {
        this.IsViewDetail = false;
        this.CurrentReference.IsVisible = false;
    }

    public ngOnInit(): void {
        this.LoadPost();
    }
}