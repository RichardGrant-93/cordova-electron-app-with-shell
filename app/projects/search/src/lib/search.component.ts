import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { Form } from '@library/form/src/lib/models/form.model';
import { AdvancedType, AdvancedTypes } from '@library/result-table/src/public-api';
import { Observable, of } from 'rxjs';

export interface contracts {
  contractId: string;
  jobType: string;
  contractType: string;
  distance: number;
  averagePrice: AdvancedType<number>;
  clientRating: number;
  sqft: number;
  completionEstimate: string;
};

const ELEMENT_DATA: Observable<contracts[]> = of([
  {contractId: '123', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'},
  {contractId: '123', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'}
]);

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() formTemplate: Form[] = [];
  @Input() actionButtons: ActionButton[] = [];
  data = ELEMENT_DATA;

  constructor() { }
  
  ngOnInit(): void {
  }

  onPage(pageEvent: PageEvent){
    console.log("pageEvent", pageEvent);
  }

}
