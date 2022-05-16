import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextInputComponent } from './text-input.component';

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
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [TextInputComponent],
  providers: []
})
export class TextInputModule { }
