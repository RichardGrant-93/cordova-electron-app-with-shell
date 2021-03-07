import { Component, ContentChild, ViewChild } from '@angular/core';
import { MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isExpanded = true;
  navLinks = [
    {
      icon: 'help_center',
      text: 'How it works'
    },
    {
      icon: 'people',
      text: 'Freelancers'
    },
    {
      icon: 'receipt',
      text: 'Find Contracts'
    },
  ];

  detectmob() {
    if (window.innerWidth <= 800 && window.innerHeight <= 768) {
      return true;
    } else {
      return false;
    }
  }

  onToggle(toggleStatus: boolean){
    this.isExpanded = toggleStatus;
  }
}
