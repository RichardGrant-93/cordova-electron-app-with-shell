import { Component, Injectable, OnInit } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { Form, FormInputType } from '@library/form/src/lib/models/form.model';
import { KebabActionEmit } from '@library/result-table/src/lib/result-table/result-table.component';
import { AdvancedTypes } from '@library/result-table/src/public-api';
import { contracts } from '@library/search/src/public-api';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { KebabActions } from './component-store/table-search.models';
import { TableSearchStore } from './component-store/table-search.store';
import { DetailActionButton } from './details/component-store/details.model';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { Button } from '@library/button/src/lib/button/button.component';

const ELEMENT_DATA: Observable<contracts[]> = of([
  {contractId: '123', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'},
  {contractId: '456', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'}
]);

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss'],
})
@Injectable()
export class TableSearchComponent implements OnInit {

  public button: Button = {
    style: 'primary',
    text: 'Action',
    icon: MaterialIcon.plus_one,
    options: [
      {
        style: 'primary',
        text: 'Button 1',
        icon: MaterialIcon.plus_one,
      },
      {
        style: 'primary',
        text: 'Button 2',
        icon: MaterialIcon.plus_one,
    
      }
    ]
  };

  
  public formInputType = FormInputType;

  public data$ = ELEMENT_DATA;

  readonly searchForm$$: BehaviorSubject<Form[]> = this.tableSearchStore.searchForm$$;
  readonly resultKebabActions$$: BehaviorSubject<NavLink[]> = this.tableSearchStore.resultKebabActions$$;
  readonly actionButtons$$: BehaviorSubject<ActionButton[]> = this.tableSearchStore.actionButtons$$;
  readonly selectedDetailId$$: BehaviorSubject<string> = this.tableSearchStore.selectedDetailId$$;
  readonly hideColumnNames$$: BehaviorSubject<string[]> = this.tableSearchStore.hideColumnNames$$;

  /**
  * Initialize [[FormComponent]] with custom fields.
  */
  constructor(private tableSearchStore: TableSearchStore) { }

  ngOnInit(): void {
  }

  onFormChange(event: ActionEmit<Form>){

  }

  getColumns(data: contracts[]){
    return Object.keys(data[0]);
  }

  onAction(formAction: ActionEmit<Form>){

  }

  onResultKebabAction(kebabAction: KebabActionEmit<any>){
    switch(kebabAction.action){
      case KebabActions.ViewEdit:{
        this.tableSearchStore.loadSelectedDetailId(kebabAction.row?.contractId);
        break;
      }
    };
  }

  onDetailAction(action: ActionEmit<Form>){
    switch(action.action){
      case DetailActionButton.Save: {
        break;
      };
      case DetailActionButton.Cancel: {
        this.tableSearchStore.loadSelectedDetailId(null);
        break;
      };
    }
  }
}
