import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { FormComponent } from './form.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder } from '@angular/forms';

const material = [
  MatInputModule,
  MatAutocompleteModule
];



@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FlexModule,
    ...material
  ],
  exports: [FormComponent],
  providers: [FormBuilder]
})
export class FormModule { }
