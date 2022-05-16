import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ShimmerModule } from '@library/shimmer/src/public-api';
import { MatListModule } from '@angular/material/list';
import { KebabMenuModule } from '@library/kebab-menu/src/projects';
import { AdvancedTypesModule } from '../advanced-types/advanced-types.module';
import { ResultTableComponent } from './result-table.component';

const child_modules = [
  AdvancedTypesModule,
];
const library_modules = [
  ShimmerModule,
  KebabMenuModule,
];

const material = [
  MatTableModule,
  MatListModule,
];

/**
* display list of results
*/
@NgModule({
  declarations: [ResultTableComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material,
  ],
  exports: [ResultTableComponent]
})
export class ResultTableModule { }
