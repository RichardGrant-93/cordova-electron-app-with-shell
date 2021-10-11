import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-shimmer',
  template: `
    <div class="shine"></div>
  `,
  styleUrls: ['./shimmer.component.scss']
})
export class ShimmerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
