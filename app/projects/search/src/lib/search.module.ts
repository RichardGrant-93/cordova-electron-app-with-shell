import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';

import { FormModule } from '@library/form/src/public-api';
import { PaginationModule } from '@library/pagination/src/public-api';
import { ResultTableModule } from '@library/result-table/src/public-api';
import { CommonModule } from '@angular/common';

const application_modules = [
  FormModule,
  ResultTableModule,
  PaginationModule
];

/**
* Join [[FormModule]] and [[ResultTableModule]] for [[SearchComponent]] functionality.
*/
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ...application_modules
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
