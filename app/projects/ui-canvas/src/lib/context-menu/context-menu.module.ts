import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MenuModule } from '@library/menu/src/lib/menu/menu.module';
import { ContextMenuComponent } from './context-menu.component';

const child_modules = [
];

const library_modules = [
  MenuModule,
];
  
const material = [
  MatTooltipModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
];

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...material,
    ...library_modules,
  ],
  exports: [ContextMenuComponent]
})
export class ContextMenuModule { }
