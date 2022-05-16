import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DetailsComponent } from "./details.component";
import { DetailsStore } from './component-store/details.store';
import { FormModule } from "@library/form/src/public-api";
import { MatCardModule } from "@angular/material/card";
import { MutableListModule } from "@library/result-table/src/lib/mutable-table/mutable-list.module";

export const routes: Routes = [
    {
        path: 'details',
        component: DetailsComponent,
    },
];

const library_modules = [
    FormModule,
    MutableListModule
];

const application_modules = [
];
  
const material = [
    MatCardModule
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes), 
        ...library_modules,
        ...application_modules, 
        ...material,
    ],
    exports: [DetailsComponent],
    providers: [DetailsStore],
    declarations: [DetailsComponent],
})
export class DetailsModule { }