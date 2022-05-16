import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedTypesComponent } from './advanced-types.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

const child_modules = [];
const library_modules = [
];

const material = [
    MatChipsModule,
    MatButtonModule,
];

/**
* display list of results
*/
@NgModule({
  declarations: [AdvancedTypesComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material,
  ],
  exports: [AdvancedTypesComponent]
})
export class AdvancedTypesModule { }
