import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuPositionY } from '@angular/material/menu';
import { TooltipPosition } from '@angular/material/tooltip';
import { MenuComponent } from '@library/menu/src/projects';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';

@Component({
  selector: 'lib-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';
  @Input() navLinks: NavLink[] = [];
  @Input() footerNavLinks: NavLink[] = [{text: 'Logout', route: ''}];

  position: TooltipPosition = 'below';

  get initials(){
    return this.name.split(' ').map(n=>{
      return n[0];
    }).join('');
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
