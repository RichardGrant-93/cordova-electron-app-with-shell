import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DatabaseSchemaComponent } from "./database-schema.component";
import { DragDropModule} from '@angular/cdk/drag-drop';
import { ToolbarModule } from "@library/toolbar/src/projects";
import { FormModule } from "@library/form/src/public-api";
import { MutableListModule } from "@library/result-table/src/lib/mutable-table/mutable-list.module";
import { UiCanvasModule } from "@library/ui-canvas/src/public-api";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { TableSearchStore } from "@app/table-search/component-store/table-search.store";
import { MouseControllerModule } from "@library/mouse-controller/src/public-api";
import { DatabaseSchemaStore } from "./component-store/database-schema.store";
import { FieldBuilderModule } from "./field-builder/field-builder.module";

export const routes: Routes = [
    {
        path: 'database-schema',
        component: DatabaseSchemaComponent
    },
];

const child_modules = [
    FieldBuilderModule
];

const library_modules = [
    ToolbarModule,
    FormModule,
    MutableListModule,
    UiCanvasModule,
    MouseControllerModule
];
  
const material = [
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ...child_modules,
        ...library_modules, 
        ...material,
    ],
    exports: [],
    providers: [TableSearchStore, DatabaseSchemaStore,
        {
            provide: MatDialogRef,
            useValue: {}
          }],
    declarations: [DatabaseSchemaComponent, AdminPanelComponent],
})
export class DatabaseSchemaModule { }