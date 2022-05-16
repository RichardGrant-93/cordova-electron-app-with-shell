import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NavLinkComponent } from './nav-link.component';

const child_modules = [];
const library_modules = [];

const material = [
  MatMenuModule,
  MatIconModule
];

@NgModule({
  declarations: [NavLinkComponent,],
  imports: [
    CommonModule,
    RouterModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [NavLinkComponent]
})
export class NavLinkModule { }
