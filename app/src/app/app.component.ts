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
  ]
  

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
