import { Point } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger, MenuPositionY } from '@angular/material/menu';
import { TooltipPosition } from '@angular/material/tooltip';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { ICanvasObject, IKebabArgs } from '../ui-canvas.directive';

@Component({
  selector: 'lib-ui-canvas-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input() footerNavLinks: NavLink[] = [];

  @Input() canvasObject: ICanvasObject<IKebabArgs>;

  @ViewChild('uiCanvasContextMenuTrigger') contextMenuTrigger: MatMenuTrigger;
  
  @Output() buttonClick: EventEmitter<NavLink> = new EventEmitter();

  position: TooltipPosition = 'below';

  menuX:number=0
  menuY:number=0

  get groupName(){
    return this.canvasObject?.args?.groupName;
  }

  get objectName(){
    return this.canvasObject.args.objectName;
  }

  get navLinks(){
    return this.canvasObject.args.options;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  open(openAt: Point){
    this.menuX = openAt.x;
    this.menuY = openAt.y;
    this.contextMenuTrigger.closeMenu();
    this.contextMenuTrigger.openMenu();
    console.log("openAt", openAt);

  }

  openManu(){
    console.log("this", this.navLinks);
    //this.contextMenuTrigger.openMenu();
  }

  close(){
    this.contextMenuTrigger.closeMenu();
  }

  onButtonClick(event: NavLink){
    this.buttonClick.emit(event);
  }
}
