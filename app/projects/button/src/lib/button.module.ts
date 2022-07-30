import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SplitButtonComponent } from './split-button/split-button.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

const child_modules = [
];

const library_modules = [
];

const material = [
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
];


@NgModule({
  declarations: [SplitButtonComponent, ButtonComponent],
  imports: [
    ...child_modules,
    ...library_modules, 
    ...material,
    CommonModule,
  ],
  exports: [SplitButtonComponent, ButtonComponent]
})
export class ButtonModule { }
