import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders }  from "@angular/core";

import { HomeComponent } from "./Home";
import { UserComponent } from "./User";

const ConstRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "user", component: UserComponent },
    { path: "**", redirectTo: "" }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(ConstRoutes);