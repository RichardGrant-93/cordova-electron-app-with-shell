import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ShimmerModule } from '@library/shimmer/src/public-api';
import { MatListModule } from '@angular/material/list';
import { KebabMenuModule } from '@library/kebab-menu/src/projects';
import { ResultTableModule } from './result-table/result-table.module';
import { AdvancedTypesModule } from './advanced-types/advanced-types.module';
import { MutableListComponent } from './mutable-table/mutable-list.component';
import { MutableListModule } from './mutable-table/mutable-list.module';

const child_modules = [
  AdvancedTypesModule,
  ResultTableModule,
  MutableListModule
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
  declarations: [],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material,
  ],
  exports: []
})
export class ResultTableMainModule { }
