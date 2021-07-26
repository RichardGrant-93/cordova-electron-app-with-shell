import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableSearchComponent } from "./table-search.component";

export const routes: Routes = [
    {
        path: 'search',
        component: TableSearchComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [],
})
export class TableSearchModule { }