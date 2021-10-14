import { Component, Input, OnInit } from '@angular/core';
import { MenuPositionY } from '@angular/material/menu';
import { TooltipPosition } from '@angular/material/tooltip';
import { NavLink } from '@library/vertical-navigation/src/lib/models/navLink.model';

@Component({
  selector: 'lib-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';
  @Input() navLinks: NavLink[] = [];

  menuPos: MenuPositionY;

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
