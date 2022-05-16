import { Component, Injectable } from '@angular/core';
import { KebabActions } from '@app/table-search/component-store/table-search.models';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ComponentField, Form, FormField, FormInputType, Lookup } from '@library/form/src/lib/models/form.model';
import { MutableList } from '@library/result-table/src/lib/mutable-table/mutable-list.component';
import { MutableListActionButton } from '@library/result-table/src/lib/mutable-table/mutable-list.models';
import { ComponentStore } from '@ngrx/component-store';
import { BehaviorSubject, combineLatest, observable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetailActionButton } from './details.model';

export interface DetailsState {
  form: Form[],
  actionButtons: ActionButton[]
};

const initialState: DetailsState = {
  form: [
    {
      fields: [
        {
          inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
          defaultValue:  {id: 1, value: 'Item 1'} as Lookup<string>,
          name: 'input1',
          placeholder: "Choose an option",
          options: [
            {id: 1, value: 'Item 1'},
            {id: 2, value: 'Item 2'},
            {id: 3, value: 'Item 3'}
          ] as Lookup<string>[],
          col: 12
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
          col: 3
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
          col: 3
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
          col: 3
        } as FormField<string>,
        {
          inputType: FormInputType.CUSTOM,
          col: 12,
          parameters: {
            headerFormTemplate$$: new BehaviorSubject([]),
            headerFormActionButtons$$: new BehaviorSubject([
              {style: "primary", text: MutableListActionButton.AddNew},
            ]),
            headerFormEmitOnChange: false,
            headerActionButtonsRaised: false,
            columns: ['id', 'value'],
            hideColumnNames: ['Actions'],
            data$: of([{"id": "1", "value": "test value 1"}, {"id": "2", "value": "test value 2"}, {"id": "3", "value": "test value 3"}]),
            isLoading$$: new BehaviorSubject(false),
            actions$$: new BehaviorSubject([
              {text: KebabActions.Duplicate, route:''},
              {text: KebabActions.Delete, route:''}
            ]),
            identifier: 'id',
            noResultString: "No Results",
          } as MutableList<Lookup<string>>
        } as ComponentField<MutableList<Lookup<string>>>
      ] as FormField<any>[]
    }
  ] as Form[],
  actionButtons: [
    {style: "warn", text: DetailActionButton.Cancel},
    {style: "primary", text: DetailActionButton.Save},
  ],
};

@Injectable()
export class DetailsStore extends ComponentStore<DetailsState> {
  private readonly forms$: Observable<Form[]> = this.select(state => state.form);
  readonly forms$$: BehaviorSubject<Form[]> = new BehaviorSubject([]);
  private readonly actionButtons$: Observable<ActionButton[]> = this.select(state => state.actionButtons);
  readonly actionButtons$$: BehaviorSubject<ActionButton[]> = new BehaviorSubject([]);

  constructor() {
    super(initialState);
    this.forms$.subscribe((forms)=> this.forms$$.next(forms));
    this.actionButtons$.subscribe((actionButtons)=> this.actionButtons$$.next(actionButtons));
  }
}
