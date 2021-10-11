import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
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

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() formTemplate: Form[] = [];
  @Input() actionButtons: ActionButton[] = [];
  @Input() data$: Observable<any[]> = new Observable();
  @Input() columns: string[] = [];
  @Input() emitOnChange: boolean = false;

  @Output() action:EventEmitter<ActionEmit<Form>> = new EventEmitter();

  constructor() { }
  
  ngOnInit(): void {
  }

  onPage(pageEvent: PageEvent){
    console.log("pageEvent", pageEvent);
  }

  onAction(event:ActionEmit<Form>){
    this.action.emit({
      action: event.action,
      actionType: event.actionType,
      form: event.form
    });
  }

}
