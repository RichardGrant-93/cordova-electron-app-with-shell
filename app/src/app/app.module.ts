import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexModule } from '@angular/flex-layout';

import { AppComponent } from '@app/app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';

import { VerticalNavigationModule } from '@library/vertical-navigation/src/public-api';
import { FormModule } from '@library/form/src/public-api';
import { ResultTableModule } from '@library/result-table/src/public-api';

const application_modules = [
  VerticalNavigationModule,
  FormModule,
  ResultTableModule
];

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    ...application_modules,
    ...material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
