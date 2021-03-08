import { NgModule } from '@angular/core';
import { ResultTableComponent } from './result-table.component';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

const material = [
  MatTableModule
]


@NgModule({
  declarations: [ResultTableComponent],
  imports: [
    CommonModule,
    ...material
  ],
  exports: [ResultTableComponent]
})
export class ResultTableModule { }
