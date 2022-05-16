import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdvancedTypes } from '../advanced-types/advanced-types.models';

export enum Action{
  OPTION
};

export interface KebabActionEmit<T1>{
  action?: string;
  actionType: Action;
  row: T1;
}

@Component({
  selector: 'lib-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() hideColumnNames: string[] = [];

  @Input() data$: Observable<any[]> = new Observable();
  @Input() isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  @Input() selectedDetailId$$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  @Input() actions$$: BehaviorSubject<NavLink[]> = new BehaviorSubject([]);
  @Input() detailTemplate: TemplateRef<any>;
  @Input() noResultTemplate: TemplateRef<any>;
  @Input() identifier: string;

  @Output() action: EventEmitter<KebabActionEmit<any>> = new EventEmitter();
  
  advancedTypes = AdvancedTypes;

  get actions(){
    return this.actions$$?.value || [];
  }

  get processedColumns(){
    if(this.actions.length > 0){
      return this.columns.concat('Actions');
    }
    return this.columns;
  }

  constructor() {}

  ngOnInit(): void {
    this.data$.pipe(tap(()=>{
      this.isLoading$$.next(false);
    })).subscribe();
  }

  header(columnName: string){
    return columnName[0].toLocaleUpperCase() + columnName.replace(/(?<!^)([A-Z])/g, ' $1').slice(1);
  }

  trackById(index : number, item : any) {
    return item.id;
  }

  columnIsProcessed(column: string){
    return this.columns.indexOf(column) === -1;
  }

  onKebabButtonClick(navLink: NavLink, row: any){
    this.action.emit({action: navLink.text, actionType: Action.OPTION, row: row} as KebabActionEmit<any>)
  }
}
