import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isExpanded = true;
  finishedLoading = false;
  isFullscreen = false;
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
    {
      icon: MaterialIcon.memory,
      text: 'Database Schema',
      route: '/database-schema/database-schema'
    },
  ];

  @ViewChild('drawerContainer', {read: ElementRef, static: false}) drawerContainer: ElementRef<HTMLElement>;

  constructor(private cd: ChangeDetectorRef){
  }

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

  whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionEnd',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionEnd',
      'WebkitTransition':'webkitTransitionEnd',
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
  }
}
