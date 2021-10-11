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

const material = [
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatFormFieldModule,
];


/**
 * Dynamic form builder.
 */
@NgModule({
  declarations: [FormComponent, filterArrayOfObjects],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    ...material
  ],
  exports: [FormComponent],
  providers: [FormBuilder, filterArrayOfObjects]
})
export class FormModule { }
