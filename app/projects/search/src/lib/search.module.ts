import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';

import { FormModule } from '@library/form/src/public-api';
import { PaginationModule } from '@library/pagination/src/public-api';
import { ResultTableMainModule } from '@library/result-table/src/public-api';
import { CommonModule } from '@angular/common';
import { ResultTableModule } from '@library/result-table/src/lib/result-table/result-table.module';

const child_modules = [];
const library_modules = [
  FormModule,
  ResultTableModule,
  PaginationModule,
];
const material = [];

/**
* Join [[FormModule]] and [[ResultTableModule]] for [[SearchComponent]] functionality.
*/
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
