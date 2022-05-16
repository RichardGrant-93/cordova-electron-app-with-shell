import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { BehaviorSubject } from 'rxjs';

export interface KebabMenu{
  navLinks?: NavLink[],
  footerNavLinks?: NavLink[],
  icon?: MaterialIcon
};

@Component({
  selector: 'lib-kebab-menu',
  templateUrl: './kebab-menu.component.html',
  styleUrls: ['./kebab-menu.component.scss']
})
export class KebabMenuComponent implements OnInit {
  @Input() navLinks: NavLink[] = [];
  @Input() footerNavLinks: NavLink[] = [];
  @Input() icon: MaterialIcon = MaterialIcon.more_vert;

  @Output() kebabButtonClick: EventEmitter<NavLink> = new EventEmitter();
  
  position: TooltipPosition = 'below';
  constructor() { }

  ngOnInit(): void {
  }

  onKebabButtonClick(navLink: NavLink){
    this.kebabButtonClick.emit(navLink);
  }

}
