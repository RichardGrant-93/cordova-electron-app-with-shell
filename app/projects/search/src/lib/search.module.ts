import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';

import { FormModule } from '@library/form/src/public-api';
import { PaginationModule } from '@library/pagination/src/public-api';
import { ResultTableModule } from '@library/result-table/src/public-api';

const application_modules = [
  FormModule,
  ResultTableModule,
  PaginationModule
];


@NgModule({
  declarations: [SearchComponent],
  imports: [
    ...application_modules
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
