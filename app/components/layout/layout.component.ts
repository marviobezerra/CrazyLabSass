import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service"

@Component({
    selector: "layout",
    templateUrl: "/components/layout/layout.html",
    styles: [require("./layout.scss")]
})
export class LayoutComponent implements OnInit {
    constructor(private taskService: TaskService) {
    }

    public BusyState: boolean = false;

    public ngOnInit(): void {
        this.taskService.BusyObservable
            .subscribe((value: boolean) => {

                this.BusyState = value;
                console.log("Busy", value)
            });
    }
}