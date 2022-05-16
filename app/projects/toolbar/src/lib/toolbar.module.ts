import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar.component';

const child_modules = [
];
const library_modules = [
];

const material = [
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
