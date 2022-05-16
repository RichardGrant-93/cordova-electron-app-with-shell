import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Form } from '@angular/forms';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { KebabActionEmit } from '../result-table/result-table.component';

export interface MutableList<T>{
  headerFormTemplate$$: BehaviorSubject<Form[]>;
  headerFormActionButtons$$: BehaviorSubject<ActionButton[]>;
  headerFormEmitOnChange: boolean;
  headerActionButtonsRaised: boolean;
  columns: string[];
  hideColumnNames: string[];
  data$: Observable<T[]>;
  isLoading$$: BehaviorSubject<boolean>;
  actions$$: BehaviorSubject<NavLink[]>;
  identifier: string;
  noResultString: string;
};

@Component({
  selector: 'lib-mutable-list',
  templateUrl: './mutable-list.component.html',
  styleUrls: ['./mutable-list.component.scss']
})
export class MutableListComponent implements MutableList<any>, OnInit {
  @Input() headerFormTemplate$$: BehaviorSubject<Form[]> = new BehaviorSubject([]);
  @Input() headerFormActionButtons$$: BehaviorSubject<ActionButton[]> = new BehaviorSubject([]);
  @Input() headerFormEmitOnChange: boolean = false;
  @Input() headerActionButtonsRaised: boolean = false;

  @Input() columns: string[] = [];
  @Input() hideColumnNames: string[] = [];

  @Input() data$: Observable<any[]> = new Observable();
  @Input() isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  @Input() actions$$: BehaviorSubject<NavLink[]> = new BehaviorSubject([]);
  @Input() identifier: string;

  @Input() noResultString: string = 'No Results';

  @Output() action: EventEmitter<KebabActionEmit<any>> = new EventEmitter();
  @Output() headerFormAction:EventEmitter<ActionEmit<Form>> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onKebabAction(action: KebabActionEmit<any>){
    this.action.emit(action);
  }

  onHeaderFormAction(action: ActionEmit<Form>){
    this.headerFormAction.emit(action);
  }

}
