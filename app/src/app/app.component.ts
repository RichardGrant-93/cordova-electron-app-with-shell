import { Component } from '@angular/core';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';

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
      icon: MaterialIcon.search,
      text: 'Find Contracts',
      route: '/search/table/search'
    },
  ];

  avatarMenuLinks = [
    {
      icon: MaterialIcon.manage_accounts,
      text: 'Account Settings',
      route: '/search/table/search'
    },
    {
      icon: MaterialIcon.public,
      text: 'Organization Settings',
      route: '/search/table/search'
    },
    {
      icon: MaterialIcon.settings_applications,
      text: 'App Settings',
      route: '/search/table/search'
    },
    {
      icon: MaterialIcon.help,
      text: 'Support',
      route: '/search/table/search'
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
