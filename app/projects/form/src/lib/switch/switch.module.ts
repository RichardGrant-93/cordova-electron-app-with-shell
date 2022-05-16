import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from './switch.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const child_modules = [
];

const library_modules = [
];

const material = [
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
];


/**
 * Dynamic form builder.
 */
@NgModule({
  declarations: [SwitchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [SwitchComponent],
  providers: []
})
export class SwitchModule { }
