import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule} from '@angular/cdk/drag-drop';
import { FormModule } from "@library/form/src/public-api";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { KebabMenuModule } from "@library/kebab-menu/src/projects";
import { FormBuilderComponent } from "./form-builder.component";
import { MatIconModule } from "@angular/material/icon";


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
    MatIconModule,
];

@NgModule({
    imports: [
        CommonModule,
        ...child_modules,
        ...library_modules, 
        ...material,
    ],
    exports: [FormBuilderComponent],
    providers: [],
    declarations: [FormBuilderComponent],
})
export class FormBuilderModule { }