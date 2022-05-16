//ng generate @ngrx/schematics:component-store component-store/table-search --module=table-search.module.ts --component=""
import { Injectable } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { Form, FormField, FormInputType, Lookup } from '@library/form/src/lib/models/form.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { ComponentStore } from '@ngrx/component-store';
import { BehaviorSubject, Observable } from 'rxjs';
import { KebabActions } from './table-search.models';

export interface TableSearchState {
  searchForm: Form[],
  resultKebabActions: NavLink[],
  actionButtons: ActionButton[],
  selectedDetailId: string,
  hideColumnNames: string[],
};

const initialState: TableSearchState = {
  searchForm: [
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
          col: 3
        } as FormField<string>,
        {
          inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
          defaultValue: null as Lookup<string>,
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
          defaultValue: null as Lookup<string>,
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
          defaultValue: null as Lookup<string>,
          name: 'input4',
          placeholder: "Choose an option",
          options: [
            {id: 1, value: 'Item 1'},
            {id: 2, value: 'Item 2'},
            {id: 3, value: 'Item 3'}
          ] as Lookup<string>[],
          col: 3
        } as FormField<string>,
        {
          inputType: FormInputType.SWITCH,
          defaultValue:  true,
          name: 'allow-null',
          placeholder: "1 2 3 4 5",
          col: 3
        },
        {
          inputType: FormInputType.CHIPS,
          defaultValue: [{id: 1, value: 'Item 1'}] as Lookup<string>[],
          name: 'input5',
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
          defaultValue: {id: 1, value: 'Item 1'} as Lookup<string>,
          name: 'input6',
          placeholder: "Choose an option",
          options: [
            {id: 1, value: 'Item 1'},
            {id: 2, value: 'Item 2'},
            {id: 3, value: 'Item 3'}
          ] as Lookup<string>[],
          col: 3
        } as FormField<string>,
        {
          inputType: FormInputType.TEXT_INPUT,
          defaultValue: 'derp',
          name: 'input7',
          placeholder: "Choose an option",
          col: 3
        } as FormField<string>,
        {
          inputType: FormInputType.TEXT_INPUT_NUMBER,
          defaultValue: null,
          name: 'input8',
          placeholder: "Numbers only",
          col: 3
        } as FormField<number>
      ] as FormField<any>[]
    }
  ] as Form[],
  resultKebabActions: [
    {text: KebabActions.ViewEdit, route:''}, 
    {text: KebabActions.Duplicate, route:''}, 
    {text: KebabActions.Delete, route:''}
  ],
  actionButtons: [
    {style: "primary", text: "search"},
  ],
  selectedDetailId: null,
  hideColumnNames: ['Actions']
};

@Injectable()
export class TableSearchStore extends ComponentStore<TableSearchState> {
  private readonly searchForm$: Observable<Form[]> = this.select(state => state.searchForm);
  private readonly resultKebabActions$: Observable<NavLink[]> = this.select(state => state.resultKebabActions);
  private readonly actionButtons$: Observable<ActionButton[]> = this.select(state => state.actionButtons);
  private readonly selectedDetailId$: Observable<string> = this.select(state=> state.selectedDetailId);
  private readonly hideColumnNames$: Observable<string[]> = this.select(state=> state.hideColumnNames);

  readonly searchForm$$: BehaviorSubject<Form[]> = new BehaviorSubject([]);
  readonly resultKebabActions$$: BehaviorSubject<NavLink[]> = new BehaviorSubject([]);
  readonly actionButtons$$: BehaviorSubject<ActionButton[]> = new BehaviorSubject([]);
  readonly selectedDetailId$$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  readonly hideColumnNames$$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() {
    super(initialState);

    this.searchForm$.subscribe((searchForm)=> this.searchForm$$.next(searchForm));
    this.resultKebabActions$.subscribe((resultKebabActions)=> this.resultKebabActions$$.next(resultKebabActions));
    this.actionButtons$.subscribe((actionButtons)=> this.actionButtons$$.next(actionButtons));
    this.selectedDetailId$.subscribe((selectedDetailId)=> this.selectedDetailId$$.next(selectedDetailId));
    this.hideColumnNames$.subscribe((hideColumnNames)=> this.hideColumnNames$$.next(hideColumnNames));
  }

  readonly loadSelectedDetailId = this.updater((state, selectedDetailId: string | null)=>({
    ...state, 
    selectedDetailId: selectedDetailId
  }));
}
