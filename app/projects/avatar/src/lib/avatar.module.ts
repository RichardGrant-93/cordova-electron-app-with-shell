import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarComponent } from './avatar.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MenuModule } from '@library/menu/src/lib/menu/menu.module';

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
  declarations: [AvatarComponent],
  imports: [
    CommonModule,
    ...child_modules,
    ...material,
    ...library_modules,
  ],
  exports: [AvatarComponent]
})
export class AvatarModule { }
