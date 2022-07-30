import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavLink } from '../../../menu/src/lib/nav-link/models/navLink.model';
import { MaterialIcon } from './models/materialIcon.model';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
  styleUrls: ['./vertical-navigation.component.scss']
})
export class VerticalNavigationComponent {
  @Input() isExpanded: boolean = true;  

  @Input() navLinks: NavLink[] = [];

  @Input() public showToolTip: boolean = true;

  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  position: TooltipPosition = 'right';

  toggle(){
    this.isExpanded = !this.isExpanded;
    this.toggled.emit(this.isExpanded);
  }

}
