import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { filterArrayOfObjects } from '../pipes/filterArrayOfObjects.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '../pipes/pipes.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteTextInputComponent } from './auto-complete-text-input.component';

const child_modules = [
    PipesModule,
];

const library_modules = [
];

const material = [
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
];


/**
 * Dynamic form builder.
 */
@NgModule({
  declarations: [AutoCompleteTextInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [AutoCompleteTextInputComponent],
  providers: [filterArrayOfObjects]
})
export class AutoCompleteTextInputModule { }
