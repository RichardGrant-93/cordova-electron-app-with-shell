import { NgModule } from '@angular/core';
import { ResultTableComponent } from './result-table.component';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

const material = [
  MatTableModule
]

/**
* display list of results
*/
@NgModule({
  declarations: [ResultTableComponent],
  imports: [
    CommonModule,
    ...material
  ],
  exports: [ResultTableComponent]
})
export class ResultTableModule { }
