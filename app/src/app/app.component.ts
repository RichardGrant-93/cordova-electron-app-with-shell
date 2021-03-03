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
  @ViewChild("drawerContainer") container: MatDrawerContainer;
  constructor(){}
  log(a: any){
    console.log(a);
  }

  update(){
    
  }
}
