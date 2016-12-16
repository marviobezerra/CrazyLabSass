import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@angular/material";

import { InfiniteScrollModule } from "angular2-infinite-scroll";

import { PackeryItemDirective } from "./directives";
import { AppComponents, AppRoutes } from "./components";
import { LayoutComponent } from "./components/layout";
import { MdIconService } from "./components/ngMdIcon";
import { SimpleService } from "./services/simple.service";
import { TaskService } from "./services/task.service";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
		ReactiveFormsModule,
        HttpModule,
        RouterModule,
        InfiniteScrollModule,
		AppRoutes,
        MaterialModule.forRoot()
    ],
    providers: [
		MdIconService,
        SimpleService,
        TaskService
    ],
    declarations: [
        PackeryItemDirective,  
        ...AppComponents
    ],
    bootstrap: [LayoutComponent]
})
export class AppModule {

}