import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableSearchComponent } from "./table-search.component";
import { TableSearchStore } from './component-store/table-search.store';
import { SearchModule } from "@library/search/src/public-api";
import { CommonModule } from "@angular/common";
import { DetailsModule } from "./details/details.module";
import { ButtonModule } from "@library/button/src/projects";

export const routes: Routes = [
    {
        path: 'search',
        component: TableSearchComponent,
    },
];

const child_modules = [
    DetailsModule
];

const library_modules = [
    SearchModule,
    ButtonModule,
];
  
const material = [
];

@NgModule({
    imports: [
        ...child_modules,
        ...library_modules, 
        ...material,
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [],
    providers: [TableSearchStore],
    declarations: [TableSearchComponent],
})
export class TableSearchModule { }