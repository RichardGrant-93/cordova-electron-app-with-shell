import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';

@Component({
  selector: 'lib-toolbar',
  templateUrl:'./toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() actions: NavLink[] = [];

  readonly materialIcons = Object.keys(MaterialIcon);

  @Output() buttonClick: EventEmitter<NavLink> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(action: NavLink){
    this.buttonClick.emit(action);
  }

}
