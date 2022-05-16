import { Injectable } from '@angular/core';
import { KebabActions } from '@app/table-search/component-store/table-search.models';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ComponentField, Form, FormField, FormInputType, Lookup } from '@library/form/src/lib/models/form.model';
import { KebabMenu } from '@library/kebab-menu/src/projects';
import { MutableList } from '@library/result-table/src/lib/mutable-table/mutable-list.component';
import { ComponentStore } from '@ngrx/component-store';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface DatabaseSchemaState {
  forms: Form[],
  actionButtons: ActionButton[]
};

function formTemplate(formKey: number){
  return {
    fields: [
      {
        inputType: FormInputType.TEXT_INPUT,
        placeholder: 'Name',
        defaultValue: '',
        name: `form-${formKey}-name`,
        col: 4,
      },
      {
        inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
        defaultValue:  {id: 1, value: 'char(size)'} as Lookup<string>,
        name: `form-${formKey}-data-type`,
        placeholder: "Data Type",
        options: [
          {id: 1, value: 'char(size)'},
          {id: 2, value: 'varchar(size)'},
          {id: 3, value: 'binary(size)'},
          {id: 4, value: 'varbinary(size)'},
          {id: 5, value: 'tinyblob'},
          {id: 6, value: 'tinytext'},
          {id: 7, value: 'text(size)'},
          {id: 8, value: 'blob(size)'},
          {id: 9, value: 'mediumtext'},
          {id: 10, value: 'mediumblob'},
          {id: 11, value: 'longtext'},
          {id: 12, value: 'longblob'},
          {id: 13, value: 'enum(val1, val2, val3, ...)'},
          {id: 14, value: 'set(val1, val2, val3, ...)'},
          {id: 15, value: 'bit(size)'},
          {id: 16, value: 'tinyint(size)'},
          {id: 17, value: 'bool'},
          {id: 18, value: 'boolean'},
          {id: 19, value: 'smallint(size)'},
          {id: 20, value: 'mediumint(size)'},
          {id: 21, value: 'int(size)'},
          {id: 22, value: 'integer(size)'},
          {id: 23, value: 'bigint(size)'},
          {id: 24, value: 'float(size, d)'},
          {id: 25, value: 'float(p)'},
          {id: 26, value: 'double(size, d)'},
          {id: 27, value: 'double precision(size, d)'},
          {id: 28, value: 'decimal(size, d)'},
          {id: 29, value: 'dec(size, d)'},
          {id: 30, value: 'date'},
          {id: 31, value: 'datetime(fsp)'},
          {id: 32, value: 'timestamp(fsp)'},
          {id: 33, value: 'time(fsp)'},
          {id: 34, value: 'year'},
          {id: 35, value: 'char(n)'},
          {id: 36, value: 'varchar(n)'},
          {id: 37, value: 'varchar(max)'},
          {id: 38, value: 'text'},
          {id: 39, value: 'nchar'},
          {id: 40, value: 'nvarchar'},
          {id: 41, value: 'nvarchar(max)'},
          {id: 42, value: 'ntext'},
          {id: 43, value: 'binary(n)'},
          {id: 44, value: 'varbinary'},
          {id: 45, value: 'varbinary(max)'},
          {id: 46, value: 'image'},
          {id: 47, value: 'bit'},
          {id: 48, value: 'tinyint'},
          {id: 49, value: 'smallint'},
          {id: 50, value: 'int'},
          {id: 51, value: 'bigint'},
          {id: 52, value: 'decimal(p,s)'},
          {id: 53, value: 'numeric(p,s)'},
          {id: 54, value: 'smallmoney'},
          {id: 55, value: 'money'},
          {id: 56, value: 'float(n)'},
          {id: 57, value: 'real'},
          {id: 58, value: 'datetime'},
          {id: 59, value: 'datetime2'},
          {id: 60, value: 'smalldatetime'},
          {id: 61, value: 'date'},
          {id: 62, value: 'time'},
          {id: 63, value: 'datetimeoffset'},
          {id: 64, value: 'timestamp'},
          {id: 65, value: 'sql_variant'},
          {id: 66, value: 'uniqueidentifier'},
          {id: 67, value: 'xml'},
          //{id: 68, value: 'cursor'},
          //{id: 69, value: 'table'},
          {id: 70, value: 'text'},
          {id: 71, value: 'memo'},
          {id: 72, value: 'byte'},
          {id: 73, value: 'integer'},
          {id: 74, value: 'long'},
          {id: 75, value: 'single'},
          {id: 76, value: 'double'},
          {id: 77, value: 'currency'},
          //{id: 78, value: 'autonumber'},
          {id: 79, value: 'date/time'},
          {id: 80, value: 'yes/no'},
          {id: 81, value: 'ole object'},
          {id: 82, value: 'hyperlink'}
        ] as Lookup<string>[],
        col: 4
      } as FormField<string>,
      {
        inputType: FormInputType.SWITCH,
        defaultValue:  true,
        name: `form-${formKey}-allow-null`,
        placeholder: "Allow Null",
        col: 3
      },
      {
        inputType: FormInputType.CUSTOM,
        col: 1,
        name: `form-${formKey}-kebab`,
        parameters: {
          navLinks: [
            {text: KebabActions.Delete, route:''}
          ],
        } as KebabMenu
      } as ComponentField<KebabMenu>
    ] as FormField<any>[]
  };
}
const initialState: DatabaseSchemaState = {
  forms: [
    formTemplate(0)
  ] as Form[],
  actionButtons: [
    {style: 'accent', text: 'Add Field'}
  ],
};

@Injectable()
export class DatabaseSchemaStore extends ComponentStore<DatabaseSchemaState> {
  private readonly forms$: Observable<Form[]> = this.select(state => state.forms);
  readonly forms$$: BehaviorSubject<Form[]> = new BehaviorSubject([]);

  private readonly actionButtons$: Observable<ActionButton[]> = this.select(state => state.actionButtons);
  readonly actionButtons$$: BehaviorSubject<ActionButton[]> = new BehaviorSubject([])

  constructor() {
    super(initialState);
    this.forms$.subscribe((forms)=>{
      console.log("subscribe");
      this.forms$$.next(forms);
    });
    this.actionButtons$.subscribe((actionButtons)=>{
      this.actionButtons$$.next(actionButtons);
    });
  }

  addNewForm(){
    this.forms$$.value.push(...[formTemplate(1)] as Form[]);
    this.forms$$.next(this.forms$$.value);
  }


  tableData(forms: Form[]){
    const headers: string[]= [].concat.apply([], forms.map(form=>{
      return form.fields.filter(field=>field.inputType !== FormInputType.CUSTOM).map((formField: FormField<any>)=>{
        return formField.placeholder;
      })
    })).filter((item, pos, ref)=>{
      return ref.indexOf(item) == pos;
    });
    
    const rows = forms.map((form, formIndex)=>{
      return headers.map((fieldName)=>{
        const field = (form.fields.filter(field=>field.inputType !== FormInputType.CUSTOM).find((field: FormField<any>)=> field.placeholder === fieldName) as FormField<any>);
        if(typeof field.defaultValue === typeof '')
          return field.defaultValue;
        if(field.defaultValue?.value)
          return field.defaultValue.value;
        return JSON.stringify(field.defaultValue) || ''
      })
    });
    return [headers, ...rows];
  }
}
