import { Component, Input, OnInit } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { Form } from '@library/form/src/lib/models/form.model';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() formTemplate: Form[] = [];
  @Input() actionButtons: ActionButton[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
