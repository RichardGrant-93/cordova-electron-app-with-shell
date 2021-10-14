import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarComponent } from './avatar.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

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
    ...material
  ],
  exports: [AvatarComponent]
})
export class AvatarModule { }
