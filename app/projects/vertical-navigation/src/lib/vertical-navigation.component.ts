import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavLink } from './models/navLink.model';
import { MaterialIcon } from './models/materialIcon.model';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
  styleUrls: ['./vertical-navigation.component.scss']
})
export class VerticalNavigationComponent implements OnInit {
  @Input() isExpanded: boolean = true;  

  @Input() navLinks: NavLink[] = [];

  @Input() public showToolTip: boolean = true;

  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  position: TooltipPosition = 'right';

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.isExpanded = !this.isExpanded;
    this.toggled.emit(this.isExpanded);
  }

}
