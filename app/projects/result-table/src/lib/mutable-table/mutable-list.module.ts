import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MutableListComponent } from './mutable-list.component';
import { ResultTableModule } from '../result-table/result-table.module';
import { MatButtonModule } from '@angular/material/button';
import { FormModule } from '@library/form/src/public-api';

const child_modules = [
  ResultTableModule
];
const library_modules = [
  FormModule,
];

const material = [
  MatButtonModule,
];

/**
* display list of results
*/
@NgModule({
  declarations: [MutableListComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material,
  ],
  exports: [MutableListComponent]
})
export class MutableListModule { }
