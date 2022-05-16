import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { Form } from '@library/form/src/lib/models/form.model';
import { MutableListActionButton } from '@library/result-table/src/lib/mutable-table/mutable-list.models';
import { KebabActionEmit } from '@library/result-table/src/lib/result-table/result-table.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { KebabActions } from '../component-store/table-search.models';
import { DetailsStore } from './component-store/details.store';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;

  @Output() action: EventEmitter<ActionEmit<Form>> = new EventEmitter();

  readonly forms$$: BehaviorSubject<Form[]> = this.detailsStore.forms$$;
  readonly actionButtons$$: BehaviorSubject<ActionButton[]> = this.detailsStore.actionButtons$$;
  
  constructor(private detailsStore: DetailsStore) { }

  ngOnInit(): void {
  }

  onAction(action: ActionEmit<Form>){
    this.action.emit(action);
  }

  onListHeaderFormAction(action: ActionEmit<Form>){
    switch(action.action){
      case MutableListActionButton.AddNew: {
        break;
      }
    }
  }

  onListAction(action: KebabActionEmit<any>){
    switch(action.action){
      case KebabActions.Delete: {
        break;
      };
      case KebabActions.Duplicate: {
        break;
      };
      case KebabActions.ViewEdit: {
        break;
      };
    }
  }

}
