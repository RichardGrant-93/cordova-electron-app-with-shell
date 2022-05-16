import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule} from '@angular/cdk/drag-drop';
import { FormModule } from "@library/form/src/public-api";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { KebabMenuModule } from "@library/kebab-menu/src/projects";
import { FieldBuilderComponent } from "./field-builder.component";


const child_modules = [
    
];

const library_modules = [
    FormModule,
    KebabMenuModule
];
  
const material = [
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
];

@NgModule({
    imports: [
        CommonModule,
        ...child_modules,
        ...library_modules, 
        ...material,
    ],
    exports: [FieldBuilderComponent],
    providers: [],
    declarations: [FieldBuilderComponent],
})
export class FieldBuilderModule { }