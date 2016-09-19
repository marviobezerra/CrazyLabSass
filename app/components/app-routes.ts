import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders }  from "@angular/core";

import { HomeComponent } from "./home";
import { UserComponent } from "./user";

const ConstRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "user", component: UserComponent },
    { path: "**", redirectTo: "" }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(ConstRoutes);