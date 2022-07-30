import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterArrayOfObjects } from '../pipes/filterArrayOfObjects.pipe';

const child_modules = [
];

const library_modules = [
];

const material = [
];


/**
 * Dynamic form builder.
 */
@NgModule({
  declarations: [FilterArrayOfObjects],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [FilterArrayOfObjects],
  providers: [FilterArrayOfObjects]
})
export class PipesModule { }
