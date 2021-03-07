import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule,  } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VerticalNavigationComponent } from './vertical-navigation.component';

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
    ...material
  ],
  exports: [VerticalNavigationComponent]
})
export class VerticalNavigationModule { }
