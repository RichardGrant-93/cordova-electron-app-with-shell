import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NavLinkModule } from '../nav-link/nav-link.module';
import { MenuComponent } from './menu.component';

const child_modules = [
  NavLinkModule
];
const library_modules = [];

const material = [
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
];

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
