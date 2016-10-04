import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@angular/material";

import { AppComponents, AppRoutes } from "./components";
import { LayoutComponent } from "./components/layout";

import { MdIconService } from "./components/ngMdIcon";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
		ReactiveFormsModule,
        HttpModule,
        RouterModule,
		AppRoutes,
        MaterialModule.forRoot()
    ],
    providers: [
		MdIconService
    ],
    declarations: [  
        AppComponents
    ],
    bootstrap: [LayoutComponent]
})
export class AppModule {

}