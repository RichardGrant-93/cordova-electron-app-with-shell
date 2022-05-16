import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filterArrayOfObjects } from '../pipes/filterArrayOfObjects.pipe';

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
  declarations: [filterArrayOfObjects],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [filterArrayOfObjects],
  providers: [filterArrayOfObjects]
})
export class PipesModule { }
