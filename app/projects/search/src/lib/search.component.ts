import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { Form } from '@library/form/src/lib/models/form.model';
import { KebabActionEmit } from '@library/result-table/src/lib/result-table/result-table.component';
import { AdvancedType } from '@library/result-table/src/public-api';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
  @Input() formTemplate$$: BehaviorSubject<Form[]> = new BehaviorSubject([]);
  @Input() actionButtons$$: BehaviorSubject<ActionButton[]> = new BehaviorSubject([]);
  @Input() data$: Observable<any[]> = new Observable();
  @Input() columns: string[] = [];
  @Input() hideColumnNames: string[] = [];
  @Input() emitOnChange: boolean = false;
  @Input() selectedDetailId$$: BehaviorSubject<string> = new BehaviorSubject(undefined);;

  @Input() resultKebabActions$$: BehaviorSubject<NavLink[]> = new BehaviorSubject([]);

  @Input() detailTemplate: TemplateRef<any>;
  @Input() identifier: string;
  
  @Output() action:EventEmitter<ActionEmit<Form>> = new EventEmitter();
  @Output() resultKebabAction: EventEmitter<KebabActionEmit<any>> = new EventEmitter();

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

  onResultKebabAction(kebabAction: KebabActionEmit<any>){
    this.resultKebabAction.emit(kebabAction);
  }

}
