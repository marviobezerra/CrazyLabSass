import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@angular/material";

import { InfiniteScrollModule } from "angular2-infinite-scroll";
import { MasonryModule } from "angular2-masonry";

import { DetailDirective } from "./directives";
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
        InfiniteScrollModule,
        MasonryModule,
		AppRoutes,
        MaterialModule.forRoot()
    ],
    providers: [
		MdIconService
    ],
    declarations: [
        DetailDirective,  
        ...AppComponents
    ],
    bootstrap: [LayoutComponent]
})
export class AppModule {

}