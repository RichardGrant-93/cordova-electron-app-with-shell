import { NgModule } from '@angular/core';
import { UiCanvasDirective } from './ui-canvas.directive';
import { ContextMenuModule } from './context-menu/context-menu.module';

const child_modules = [
  ContextMenuModule
];

const library_modules = [
];
  
const material = [
];

@NgModule({
  declarations: [UiCanvasDirective],
  imports: [
    ...child_modules,
    ...library_modules,
    ...material
  ],
  exports: [UiCanvasDirective, ContextMenuModule]
})
export class UiCanvasModule { }
