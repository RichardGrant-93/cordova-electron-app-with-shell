import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { FormComponent } from './form.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { filterArrayOfObjects } from './pipes/filterArrayOfObjects.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'
import { AutoCompleteTextInputComponent } from './auto-complete-text-input/auto-complete-text-input.component';
import { SwitchComponent } from './switch/switch.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextInputNumberComponent } from './text-input-number/text-input-number.component';
import { ChipsModule } from './chips/chips.module';
import { PipesModule } from './pipes/pipes.module';
import { SwitchModule } from './switch/switch.module';
import { AutoCompleteTextInputModule } from './auto-complete-text-input/auto-complete-text-inpute.module';
import { TextInputModule } from './text-input/text-input.module';

const child_modules = [
  PipesModule,
];

const library_modules = [
  AutoCompleteTextInputModule,
  ChipsModule,
  SwitchModule,
  TextInputModule,
];

const material = [
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatIconModule,
  MatChipsModule,
];


/**
 * Dynamic form builder.
 */
@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [FormComponent],
  providers: [FormBuilder, filterArrayOfObjects]
})
export class FormModule { }
