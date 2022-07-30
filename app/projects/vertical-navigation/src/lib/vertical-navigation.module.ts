import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule,  } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { VerticalNavigationService } from './vertical-navigation.service';

const child_modules = [];
const library_modules = [];

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule
];

@NgModule({
  declarations: [VerticalNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexModule,
    ...child_modules,
    ...library_modules,
    ...material
  ],
  providers: [VerticalNavigationService],
  exports: [VerticalNavigationComponent]
})
export class VerticalNavigationModule { }
