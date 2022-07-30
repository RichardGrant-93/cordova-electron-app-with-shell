import { Injectable } from '@angular/core';
import { KebabActions } from '@app/table-search/component-store/table-search.models';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ComponentField, Form, FormField, FormInputType, Lookup } from '@library/form/src/lib/models/form.model';
import { IFormComponent } from '@library/form/src/public-api';
import { KebabMenu } from '@library/kebab-menu/src/projects';
import { MutableList } from '@library/result-table/src/lib/mutable-table/mutable-list.component';
import { MutableListActionButton } from '@library/result-table/src/lib/mutable-table/mutable-list.models';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { ComponentStore } from '@ngrx/component-store';
import { BehaviorSubject, Observable, of } from 'rxjs';

export enum ComponentFieldName{
  Kebab = 'kebab',
  PropertiesForm = 'Properties Form',
  PropertiesFormSwitches = 'Properties Form Switches',
  CheckConstraint = 'Check Constraint',
  Conditions = 'Conditions',
  ForeignKeyConstraint = 'Foreign Key Constraint'
}

export interface DatabaseSchemaState {
  forms: Form[],
  actionButtons: ActionButton[]
};

const initialState: DatabaseSchemaState = {
  forms: [
  ] as Form[],
  actionButtons: [
    {style: 'primary', text: 'table', icon: MaterialIcon.add}
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
      this.forms$$.next(forms);
    });
    this.actionButtons$.subscribe((actionButtons)=>{
      this.actionButtons$$.next(actionButtons);
    });

    this.dynamicValues();
  }

  formTemplate(formKey: number){
    return {
      fields: [
        {
          inputType: FormInputType.TEXT_INPUT,
          placeholder: 'Name',
          defaultValue: `My Table${formKey}`,
          name: `form-${formKey}-name`,
          col: 6,
        },
        {
          inputType: FormInputType.TEXT_INPUT,
          placeholder: 'Description',
          defaultValue: '',
          name: `form-${formKey}-description`,
          col: 6,
        },
        {
          inputType: FormInputType.CUSTOM,
          name: ComponentFieldName.PropertiesForm,
          col: 12,
          parameters: {
            formTemplate$$: new BehaviorSubject([]),
            actionButtons$$: new BehaviorSubject([
              {style: 'primary', text: 'properties', icon: MaterialIcon.add}
            ]),
            emitOnChange: true,
            actionButtonsRaised: true
          } as IFormComponent
        } as ComponentField<IFormComponent>,
        {
          inputType: FormInputType.CUSTOM,
          name: ComponentFieldName.ForeignKeyConstraint,
          col: 12,
          parameters: {
            formTemplate$$: new BehaviorSubject([]),
            actionButtons$$: new BehaviorSubject([
              {
                style: 'primary', 
                text: 'foreign key', 
                icon: MaterialIcon.add,
              }
            ]),
            emitOnChange: true,
            actionButtonsRaised: true
          } as IFormComponent
        } as ComponentField<IFormComponent>,
        {
          inputType: FormInputType.CUSTOM,
          name: ComponentFieldName.CheckConstraint,
          col: 12,
          parameters: {
            formTemplate$$: new BehaviorSubject([]),
            actionButtons$$: new BehaviorSubject([
              {
                style: 'primary', 
                text: 'check', 
                icon: MaterialIcon.add,
              }
            ]),
            emitOnChange: true,
            actionButtonsRaised: true
          } as IFormComponent
        } as ComponentField<IFormComponent>
      ]
    };
  }
  
  formPropertyTemplate(formKey: number, formFieldKey: number) {
    return {
      fields: [
        {
          inputType: FormInputType.TEXT_INPUT,
          placeholder: 'Name',
          defaultValue: '',
          name: `form-${formKey}-property-${formFieldKey}-name`,
          col: 4,
        },
        {
          inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
          mustBeValidOption: true,
          defaultValue: null as Lookup<string>,
          name: `form-${formKey}-property-${formFieldKey}-data-type`,
          placeholder: "Data Type",
          options: [
            {id: 1, value: 'bigint' },
            {id: 2, value: 'binary(n)' },
            {id: 3, value: 'bit' },
            {id: 4, value: 'char(n)' },
            {id: 5, value: 'date' },
            {id: 6, value: 'datetime' },
            {id: 7, value: 'datetime2(p)' },
            {id: 8, value: 'datetimeoffset(p)' },
            {id: 9, value: 'decimal(p, s)' },
            {id: 10, value: 'float(n)' },
            {id: 11, value: 'geography' },
            {id: 12, value: 'geometry' },
            {id: 13, value: 'hierarchyid' },
            {id: 14, value: 'image' },
            {id: 15, value: 'int' },
            {id: 16, value: 'money' },
            {id: 17, value: 'nchar(n)' },
            {id: 18, value: 'ntext' },
            {id: 19, value: 'numeric(p, s)' },
            {id: 20, value: 'nvarchar(n)' },
            {id: 21, value: 'real' },
            {id: 22, value: 'smalldatetime' },
            {id: 23, value: 'smallint' },
            {id: 24, value: 'smallmoney' },
            {id: 25, value: 'sql_variant' },
            {id: 26, value: 'sysname' },
            {id: 27, value: 'text' },
            {id: 28, value: 'time(s)' },
            {id: 29, value: 'timestamp' },
            {id: 30, value: 'tinyint' },
            {id: 31, value: 'uniqueidentifier' },
            {id: 32, value: 'varbinary(n)' },
            {id: 33, value: 'varchar(n)' },
            {id: 34, value: 'xml'}
          ] as Lookup<string>[],
          col: 4
        } as FormField<string>,
        {
          inputType: FormInputType.CUSTOM,
          name: ComponentFieldName.PropertiesFormSwitches,
          col: 3,
          parameters: {
            formTemplate$$: new BehaviorSubject([
              {
                fields: [
                  {
                    inputType: FormInputType.SWITCH,
                    defaultValue:  true,
                    name: `form-${formKey}-property-${formFieldKey}-allow-null`,
                    placeholder: "Allow Null",
                    col: 12
                  },
                  {
                    inputType: FormInputType.SWITCH,
                    defaultValue:  false,
                    name: `form-${formKey}-property-${formFieldKey}-unique`,
                    placeholder: "Is Unique",
                    col: 12
                  }
                ] as FormField<any>[]
              }
            ]),
            actionButtons$$: new BehaviorSubject([]),
            emitOnChange: true,
            actionButtonsRaised: true
          } as IFormComponent
        } as ComponentField<IFormComponent>,
        {
          inputType: FormInputType.CUSTOM,
          col: 1,
          name: ComponentFieldName.Kebab,
          parameters: {
            navLinks: [
              {text: KebabActions.Delete, route:''}
            ],
          } as KebabMenu
        } as ComponentField<KebabMenu>
      ] as FormField<any>[]
    };
  }
  
  formCheckConstraintTemplate(formKey: number, formFieldKey: number) {
    return {
      fields: [
        {
          inputType: FormInputType.CUSTOM,
          name: ComponentFieldName.Conditions,
          col: 12,
          parameters: {
            formTemplate$$: new BehaviorSubject([]),
            actionButtons$$: new BehaviorSubject([
              {style: 'primary', text: 'conditions', icon: MaterialIcon.add}
            ]),
            emitOnChange: true,
            actionButtonsRaised: true
          } as IFormComponent
        } as ComponentField<IFormComponent>
      ] as FormField<any>[]
    };
  }
  
  formForeignKeyConstraintTemplate(formKey: number, formFieldKey: number) {
    return {
      fields: [
        {
          inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
          defaultValue: null as Lookup<string>,
          name: `form-${formKey}-property1-${formFieldKey}-fk-constraint`,
          placeholder: "Table.Field",
          options: this.getAllTablesAndProperties(formKey),
          col: 11
        } as FormField<string>,
        {
          inputType: FormInputType.CUSTOM,
          col: 1,
          name: ComponentFieldName.Kebab,
          parameters: {
            navLinks: [
              {text: KebabActions.Delete, route:''}
            ],
          } as KebabMenu
        } as ComponentField<KebabMenu>
      ] as FormField<any>[]
    };
  }
  
  
  formConditionTemplate(formIndex: number, constraintIndex: number, formFieldIndex: number) {

    const first = (formFieldIndex > 0)?[
      {
        inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
        defaultValue: null as Lookup<string>,
        name: `form-${formIndex}-constraint-${constraintIndex}-condition-${formFieldIndex}`,
        placeholder: "Table.Field",
        options: [
          {id: 1, value: 'AND'},
          {id: 2, value: 'OR'},
        ] as Lookup<string>[],
        col: 12
      } as FormField<string>,
    ] : [];

    return {
      fields: first.concat([
        {
          inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
          defaultValue: null as Lookup<string>,
          name: `form-${formIndex}-constraint-${constraintIndex}-condition-field1-${formFieldIndex}`,
          placeholder: "Table.Field",
          options: this.getTableProperties(formIndex),
          col: 4
        } as FormField<string>,
        {
          inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
          defaultValue: null as Lookup<string>,
          name: `form-${formIndex}-constraint-${constraintIndex}-condition-operator-${formFieldIndex}`,
          placeholder: "operator",
          options: [
            {id: 1, value: '>'},
            {id: 2, value: '>='},
            {id: 3, value: '<'},
            {id: 4, value: '<='},
            {id: 5, value: '==='},
            {id: 6, value: '!=='},
            {id: 7, value: 'Contains'},
          ] as Lookup<string>[],
          col: 3
        } as FormField<string>,
        {
          inputType: FormInputType.AUTO_COMPLETE_TEXT_INPUT,
          defaultValue: null as Lookup<string>,
          name: `form-${formIndex}-constraint-${constraintIndex}-condition-field2-${formFieldIndex}`,
          placeholder: "Table.Field",
          options: this.getAllTablesAndProperties(),
          col: 4
        } as FormField<string>,
        {
          inputType: FormInputType.CUSTOM,
          col: 1,
          name: ComponentFieldName.Kebab,
          parameters: {
            navLinks: [
              {text: KebabActions.Delete, route:''}
            ],
          } as KebabMenu
        } as ComponentField<KebabMenu>
      ] as FormField<any>[])
    };
  }

  addNewForm(){
    this.forms$$.value.push({...this.formTemplate(this.forms$$.value.length)} as Form);
    this.forms$$.next(this.forms$$.value);
    return this.forms$$.value.length - 1;
  }

  addNewFormProperty(formIndex: number){
    const propertyComponent = this.forms$$.value[formIndex].fields.find(field=>{
      return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.PropertiesForm
    }) as ComponentField<IFormComponent>;

    propertyComponent.parameters.formTemplate$$.value.push(
      this.formPropertyTemplate(formIndex, propertyComponent.parameters.formTemplate$$.value.length) as Form
    );

    propertyComponent.parameters.formTemplate$$.next(propertyComponent.parameters.formTemplate$$.value);
  }

  addNewFormCheckConstraint(formIndex: number){
    const constraintComponent = this.forms$$.value[formIndex].fields.find(field=>{
      return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.CheckConstraint
    }) as ComponentField<IFormComponent>;

    constraintComponent.parameters.formTemplate$$.value.push(
      this.formCheckConstraintTemplate(formIndex, constraintComponent.parameters.formTemplate$$.value.length) as Form
    );

    constraintComponent.parameters.formTemplate$$.next(constraintComponent.parameters.formTemplate$$.value);
  }

  dynamicValues(){
    this.forms$$.subscribe((forms: Form[])=>{
      forms.forEach((form: Form, formIndex: number)=>{
        const fkConstraintComponent = form.fields.find((field)=>{
          return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.ForeignKeyConstraint;
        }) as ComponentField<IFormComponent>;

        fkConstraintComponent.parameters.formTemplate$$.value.forEach((formTemplate, formFieldKey)=>{

          const fkConstraintComponentFormFields = (formTemplate.fields.find(field=>{
            return field.name.includes(`property1-${formFieldKey}-fk-constraint`)
          }) as FormField<string>);

          fkConstraintComponentFormFields.options = this.getAllTablesAndProperties(formIndex);

          if(fkConstraintComponentFormFields.value)
            fkConstraintComponentFormFields.value = fkConstraintComponentFormFields.options.find((option)=>{
              return option.id === (fkConstraintComponentFormFields.value as Lookup<string>).id;
            });

        });


        const checkConstraintComponent = form.fields.find((field)=>{
          return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.CheckConstraint;
        }) as ComponentField<IFormComponent>;

        checkConstraintComponent.parameters.formTemplate$$.value.forEach((formTemplate, formFieldIndex)=>{
          const conditionComponent = (formTemplate.fields.find(field=>{
            return field.name === ComponentFieldName.Conditions
          }) as ComponentField<IFormComponent>);

          conditionComponent.parameters.formTemplate$$.value.forEach((condtionFormTemplate, conditionFormFieldKey)=>{
            (condtionFormTemplate.fields.find(field=>{
              return field.name.includes(`form-${formIndex}-constraint-${formFieldIndex}-condition-field1-${conditionFormFieldKey}`);
            }) as FormField<string>).options = this.getTableProperties(formIndex);

            (condtionFormTemplate.fields.find(field=>{
              return field.name.includes(`form-${formIndex}-constraint-${formFieldIndex}-condition-field2-${conditionFormFieldKey}`);
            }) as FormField<string>).options = this.getAllTablesAndProperties();
          });

        });



        fkConstraintComponent.parameters.formTemplate$$.next(fkConstraintComponent.parameters.formTemplate$$.value);

      });
    });
  }

  addNewFormForeignKeyConstraint(formIndex: number){
    const constraintComponent = this.forms$$.value[formIndex].fields.find(field=>{
      return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.ForeignKeyConstraint
    }) as ComponentField<IFormComponent>;

    constraintComponent.parameters.formTemplate$$.value.push(
      this.formForeignKeyConstraintTemplate(formIndex, constraintComponent.parameters.formTemplate$$.value.length) as Form
    );

    constraintComponent.parameters.formTemplate$$.next(constraintComponent.parameters.formTemplate$$.value);
  }


  addNewFormCondition(formIndex: number, constraintIndex: number){
    const constraintComponent = this.forms$$.value[formIndex].fields.find(field=>{
      return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.CheckConstraint
    }) as ComponentField<IFormComponent>;

    const conditionsComponent = constraintComponent.parameters.formTemplate$$.value[constraintIndex].fields.find(field=>{
      return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.Conditions
    }) as ComponentField<IFormComponent>;

    conditionsComponent.parameters.formTemplate$$.value.push(
      this.formConditionTemplate(formIndex, constraintIndex, conditionsComponent.parameters.formTemplate$$.value.length) as Form
    )

    conditionsComponent.parameters.formTemplate$$.next(conditionsComponent.parameters.formTemplate$$.value);
  }
  getAllTablesAndProperties(omitFormIndex?: number){
    const tableAndProperties = this.forms$$.value.filter((form: Form, formIndex: number) => formIndex !== omitFormIndex).map((form: Form, formIndex: number)=>{
      const tableName = (form.fields.find((field)=>{
        return field.name === 'form-' + formIndex + '-name';
      }) as FormField<any>).value;
      const tableProperties = this.getTableProperties(formIndex);

      return tableProperties.map(property=>{
        return tableName + '.' + property.value;
      });


    }).filter((tableAndProperties)=>!!tableAndProperties);
    return [].concat.apply([], tableAndProperties).map((property, index)=>{
      return {id: index, value: property};
    }) as Lookup<string>[];

  }

  getTableProperties(formIndex: number){
    const propertyComponent = this.forms$$.value[formIndex].fields.find(field=>{
      return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.PropertiesForm
    }) as ComponentField<IFormComponent>;

    const properties = propertyComponent.parameters.formTemplate$$.value.map((formTemplate, formFieldKey: number)=>{
      return formTemplate.fields.filter((field: FormField<any>)=>{
        return field.inputType === FormInputType.TEXT_INPUT && field.name.includes(`form-${formIndex}-property-${formFieldKey}-name`);
      }).map((field: FormField<any>)=>{
        return field.value;
      })
    });

    return [].concat.apply([], properties).map((property, index)=> {
      return {id: index, value: property};
    }) as Lookup<string>[]
  }


  getTableNames(formIndexToOmit: number){
    const tableNames = this.forms$$.value.map((form: Form, formIndex: number)=>{
      if(formIndex !== formIndexToOmit)
        return (form.fields.find((field)=>{
          return field.name === 'form-' + formIndex + '-name';
        }) as FormField<any>).value;
    });
    return tableNames.filter((tableName)=>!!tableName).map((tableName, index)=> {
      return {id: index, value: tableName};
    }) as Lookup<string>[];
  }

  mapPropertyName(name: string){
    //camel concatenate, remove special characters
    return (name).replace(/ /g, '_').replace(/\.([a-z])/g, (match)=>{ return match.toUpperCase(); }).replace(/[^\w\s]/gi, '');
  }

  tableData(forms: Form[]){
    const headers: string[]= [].concat.apply([], forms.map(form=>{
      return form.fields.filter(field=>field.inputType !== FormInputType.CUSTOM).map((formField: FormField<any>)=>{
        return formField.placeholder;
      })
    })).filter((item, pos, ref)=>{
      return ref.indexOf(item) == pos;
    });
    if(headers.length === 0)
      return [];
    
    const rows = forms.map((form, formIndex)=>{
      return headers.map((fieldName)=>{
        const field = (form.fields.filter(field=>field.inputType !== FormInputType.CUSTOM).find((field: FormField<any>)=> field.placeholder === fieldName) as FormField<any>);

        if(fieldName === 'Data Type'){
          if(typeof field.value === typeof '')
            return field.value;
          if(field.value?.value)
            return field.value.value;
          if(field.value === null || field.value === undefined)
            return '';
          return JSON.stringify(field.value);
        }
        if(typeof field.value === typeof '')
          return this.mapPropertyName(field.value);
        if(field.value?.value)
          return this.mapPropertyName(field.value.value);
        if(field.value === null || field.value === undefined)
          return this.mapPropertyName('');
        return this.mapPropertyName(JSON.stringify(field.value));
      })
    })
    return [headers, ...rows];
  }
}
