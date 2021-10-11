import { NgModule } from '@angular/core';
import { ResultTableComponent } from './result-table.component';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ShimmerModule } from '@library/shimmer/src/public-api';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { AdvancedTypesComponent } from './advanced-types/advanced-types.component';

const material = [
  MatTableModule,
  MatButtonModule,
  MatChipsModule,
  MatTooltipModule,
  ClipboardModule,
  MatListModule,
];

const application_modules = [
  ShimmerModule,
];

/**
* display list of results
*/
@NgModule({
  declarations: [ResultTableComponent, AdvancedTypesComponent],
  imports: [
    CommonModule,
    ...material,
    ...application_modules,
  ],
  exports: [ResultTableComponent]
})
export class ResultTableModule { }
