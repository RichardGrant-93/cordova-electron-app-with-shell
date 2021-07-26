import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule,  } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
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
    RouterModule,
    ...material
  ],
  exports: [VerticalNavigationComponent]
})
export class VerticalNavigationModule { }
