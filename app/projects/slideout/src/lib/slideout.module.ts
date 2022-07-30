import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlideoutComponent } from './slideout.component';

const child_modules = [
];

const library_modules = [
];

const material = [
  MatButtonModule,
  MatIconModule,
];


/**
 * Dynamic form builder.
 */
@NgModule({
  declarations: [SlideoutComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [SlideoutComponent],
  providers: []
})
export class SlideoutModule { }
