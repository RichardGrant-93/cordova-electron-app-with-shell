import { NgModule } from '@angular/core';
import { ShimmerComponent } from './shimmer.component';

const child_modules = [];
const library_modules = [];
const material = [];

@NgModule({
  declarations: [ShimmerComponent],
  imports: [
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [ShimmerComponent]
})
export class ShimmerModule { }
