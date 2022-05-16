import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';

@Component({
  selector: 'lib-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() menuItems: NavLink[] = [];
  @Input() footerItems: NavLink[] = [];
  @Input() className: string = "";

  @Output() buttonClick: EventEmitter<NavLink> = new EventEmitter();

  @ViewChild(MatMenu, {static: true}) matMenu: MatMenu;

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(navLink: NavLink){
    this.buttonClick.emit(navLink);
  }

}
