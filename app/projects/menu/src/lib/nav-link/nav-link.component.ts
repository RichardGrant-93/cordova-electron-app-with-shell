import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';

@Component({
  selector: 'lib-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {
  @Input() navLinks: NavLink[] = [];
  
  @Output() buttonClick: EventEmitter<NavLink> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onButtonClick(navLink: NavLink){
    this.buttonClick.emit(navLink);
  }
  
  navigate(route: NavLink['route']){
    this.router.navigate([route])
  }

}
