import { Component, Input } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { Form, FormField, FormInputType, Lookup } from '@library/form/src/lib/models/form.model';
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
      icon: MaterialIcon.help_center,
      text: 'How it works',
      router: ''
    },
    {
      icon: MaterialIcon.people,
      text: 'Freelancers',
      router: ''
    },
    {
      icon: MaterialIcon.receipt,
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
