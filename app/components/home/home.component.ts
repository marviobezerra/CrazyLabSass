import { Component, OnInit } from "@angular/core";
import { TaskService, ITaskEntity } from "../../services/task.service"

@Component({
    selector: "home",
    templateUrl: "/components/home/home.html",
    styles: [require("./home.scss")]
})
export class HomeComponent implements OnInit {
    constructor(private taskService: TaskService) {
    }

    public Change(): void {
        console.log("Run");
        this.Aux = !this.Aux;
        this.Icon1 = this.Aux ? "amazon" : "apple";
        this.Icon2 = !this.Aux ? "amazon" : "apple";
    }

    public Tasks: Array<ITaskEntity> = [];

    public Aux: boolean = true;

    public Icon1: string = "amazon";
    public Icon2: string = "apple";
    public Icon3: string = "facebook-box";
    public Icon4: string = "facebook-messenger";
    public Icon5: string = "facebook";
    public Icon6: string = "github-box";

    public AddTask(name: string): void {
        this.taskService.CreateTask(name);
        this.Tasks = this.taskService.Report();
    }

    public Clear(): void {
        this.taskService.Clear();
    }

    public CompleteTask(task: ITaskEntity): void {
        this.taskService.CompleteTask(task.Id);
        this.Tasks = this.taskService.Report();
    }

    public CancelTask(task: ITaskEntity, reason: string): void {
        this.taskService.CancelTask(task.Id, true, reason);
        this.Tasks = this.taskService.Report();
    }

    public ngOnInit(): void {
        this.taskService.BusyObservable
            .subscribe((value: boolean) => console.log("Busy", value));
    }
}