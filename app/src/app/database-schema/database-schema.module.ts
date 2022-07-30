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
import { FormBuilderModule } from "./form-builder/fom-builder.module";
import { SlideoutModule } from "@library/slideout/src/projects";
import { VerticalNavigationComponent } from "@library/vertical-navigation/src/lib/vertical-navigation.component";
import { MouseControllerDirective } from "@library/mouse-controller/src/lib/mouse-controller.directive";
import { AvatarModule } from "@library/avatar/src/public-api";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MenuModule } from "@library/menu/src/lib/menu/menu.module";
import { ConstraintBuilderComponent } from './constraint-builder/constraint-builder.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DatabaseSchemaEffects } from './store/database-schema.effects';

export const routes: Routes = [
    {
        path: 'database-schema',
        component: DatabaseSchemaComponent
    },
];

const child_modules = [
    FormBuilderModule,
    AvatarModule,

    MenuModule
];

const library_modules = [
    ToolbarModule,
    FormModule,
    MutableListModule,
    UiCanvasModule,
    MouseControllerModule,
    SlideoutModule,
];
  
const material = [
    DragDropModule,
    MatDialogModule,
    MatButtonModule,

    MatMenuModule,
    MatTooltipModule
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ...child_modules,
        ...library_modules, 
        ...material, 
        EffectsModule.forFeature([DatabaseSchemaEffects]),
    ],
    exports: [],
    providers: [
        TableSearchStore, 
        DatabaseSchemaStore,
        MouseControllerDirective,
        {
            provide: MatDialogRef,
            useValue: {}
        },
    ],
    declarations: [DatabaseSchemaComponent, AdminPanelComponent, ConstraintBuilderComponent],
})
export class DatabaseSchemaModule { }