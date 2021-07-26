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
import { SearchModule } from '@library/search/src/public-api';
import { TableSearchComponent } from './table-search/table-search.component';
import { AppRoutingModule } from './app-routing.module';


const application_modules = [
  VerticalNavigationModule,
  SearchModule
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
    AppComponent,
    TableSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    ...application_modules,
    ...material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
