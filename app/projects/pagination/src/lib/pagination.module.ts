import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const material = [
  MatPaginatorModule
];

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    ...material
  ],
  exports: [PaginationComponent]
})
export class PaginationModule { }
