import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum AdvancedTypes{
  MONEY,
  LINK,
  CHIP,
  LIST,
  TEXT
};

export interface AdvancedType<T1>{
  type: AdvancedTypes,
  value: T1
};


@Component({
  selector: 'lib-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResultTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data$: Observable<any[]> = new Observable();
  @Input() isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  
  advancedTypes = AdvancedTypes;

  constructor() {}

  ngOnInit(): void {
    this.data$.pipe(tap(()=>{
      this.isLoading$.next(false);
    })).subscribe();
  }

  header(columnName: string){
    return columnName[0].toLocaleUpperCase() + columnName.replace(/(?<!^)([A-Z])/g, ' $1').slice(1);
  }

  trackById(index : number, item : any) {
    return item.id;
  }
}
