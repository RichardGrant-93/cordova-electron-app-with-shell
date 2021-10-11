import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { Form, FormField, FormInputType, Lookup } from '@library/form/src/lib/models/form.model';
import { AdvancedTypes } from '@library/result-table/src/public-api';
import { contracts } from '@library/search/src/public-api';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';

const ELEMENT_DATA: Observable<contracts[]> = of([
  {contractId: '123', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'},
  {contractId: '123', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'}
]);

export interface TableSearchState{
  searchForm: Form[]
}

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
@Injectable()
export class TableSearchComponent extends ComponentStore<TableSearchState> implements OnInit {
  
  public formInputType = FormInputType;

  public data$ = ELEMENT_DATA;

  @Input() actionButtons = [
    {style: "primary", text: "search"},
  ] as ActionButton[];

  /**
  * Initialize [[FormComponent]] with custom fields.
  */
  constructor() {
    super({
      searchForm: [
        {
          fields: [
            {
              inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
              defaultValue: { id: null, value: '' } as Lookup<string>,
              name: 'input1',
              placeholder: "Choose an option",
              options: [
                {id: 1, value: 'Item 1'},
                {id: 2, value: 'Item 2'},
                {id: 3, value: 'Item 3'}
              ] as Lookup<string>[],
              col: 2
            } as FormField<string>,
            {
              inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
              defaultValue: { id: null, value: '' } as Lookup<string>,
              name: 'input2',
              placeholder: "Choose an option",
              options: [
                {id: 1, value: 'Item 1'},
                {id: 2, value: 'Item 2'},
                {id: 3, value: 'Item 3'}
              ] as Lookup<string>[],
              col: 2
            } as FormField<string>,
            {
              inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
              defaultValue: { id: null, value: '' } as Lookup<string>,
              name: 'input3',
              placeholder: "Choose an option",
              options: [
                {id: 1, value: 'Item 1'},
                {id: 2, value: 'Item 2'},
                {id: 3, value: 'Item 3'}
              ] as Lookup<string>[],
              col: 2
            } as FormField<string>,
            {
              inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
              defaultValue: { id: null, value: '' } as Lookup<string>,
              name: 'input4',
              placeholder: "Choose an option",
              options: [
                {id: 1, value: 'Item 1'},
                {id: 1, value: 'Item 2'},
                {id: 1, value: 'Item 3'}
              ] as Lookup<string>[],
              col: 2
            } as FormField<string>
          ] as FormField<any>[]
        }
      ] as Form[]
    })
  }

  ngOnInit(): void {
  }

  onFormChange(event: ActionEmit<Form>){

  }

  getColumns(data: contracts[]){
    return Object.keys(data[0]);
  }

  readonly searchForm$: Observable<Form[]> = this.select(state => state.searchForm);

}
