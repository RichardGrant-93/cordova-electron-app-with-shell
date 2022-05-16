import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuModule } from '@library/menu/src/lib/menu/menu.module';
import { KebabMenuComponent } from './kebab-menu.component';

const child_modules = [
];

const library_modules = [
  MenuModule,
];

const material = [
  MatTooltipModule,
  MatMenuModule,
  MatIconModule,
];

@NgModule({
  declarations: [KebabMenuComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...library_modules,
    ...material,

  ],
  exports: [KebabMenuComponent]
})
export class KebabMenuModule { }
