import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const child_modules = [];
const library_modules = [];

const material = [
  MatPaginatorModule
];

/**
 * Pagination.
 */
@NgModule({
  declarations: [PaginationComponent],
  imports: [
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [PaginationComponent]
})
export class PaginationModule { }
