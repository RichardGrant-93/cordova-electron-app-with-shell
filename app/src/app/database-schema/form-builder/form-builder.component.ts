import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { Action, ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { ComponentField, Form, FormInputType } from '@library/form/src/lib/models/form.model';
import { IFormComponent } from '@library/form/src/public-api';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { BehaviorSubject } from 'rxjs';
import { ComponentFieldName, DatabaseSchemaStore } from '../component-store/database-schema.store';

export interface IChildActionEmit<T>{
  formAction: ActionEmit<T>, 
  formIndex: number,
  formType: FormType
}

export enum FormType{
  Builder = 'Builder',
  Properties = 'Properties',
  PropertiesFormSwitches = 'PropertiesFormSwitches',
  CheckConstraints = 'CheckConstraints',
  ForeignKeyConstraints = 'ForeignKeyConstraints'
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  //readonly forms$$: BehaviorSubject<Form[]> = this.databaseSchemaStore.forms$$;
  //readonly actionButtons$$: BehaviorSubject<ActionButton[]> = this.databaseSchemaStore.actionButtons$$;
  public readonly ComponentFieldName = ComponentFieldName;
  public readonly FormType = FormType;

  @Input() formName: string;
  @Input() forms$$: BehaviorSubject<Form[]>;
  @Input() actionButtons$$: BehaviorSubject<ActionButton[]>;

  @Input() formType: FormType = FormType.Builder;

  @Input() formIndexPath: string = '';

  get parentFormIndex(){
    const parts = this.formIndexPath.split('.');
    return parseInt(parts[0]);
  }

  @Input() selectedFormIndex$$: BehaviorSubject<number>;

  @Output() formsAction: EventEmitter<ActionEmit<Form>> = new EventEmitter();
  @Output() formFieldsAction: EventEmitter<IChildActionEmit<Form>> = new EventEmitter();
  
  constructor(private databaseSchemaStore: DatabaseSchemaStore) { }

  ngOnInit(): void {
  }

  addForm(){
    this.selectedFormIndex$$.next(this.databaseSchemaStore.addNewForm());
  }

  addFormProperty(){
    console.log("form", this.forms$$.value, this.parentFormIndex);
    this.databaseSchemaStore.addNewFormProperty(this.parentFormIndex);
  }

  addFormCheckConstraint(){
    this.databaseSchemaStore.addNewFormCheckConstraint(this.parentFormIndex);
  }

  addFormForeignKeyConstraint(){
    this.databaseSchemaStore.addNewFormForeignKeyConstraint(this.parentFormIndex);
  }

  addFormCondition(){
    const parts = this.formIndexPath.split('.');
    this.databaseSchemaStore.addNewFormCondition(parseInt(parts[1]), parseInt(parts[2]));
  }

  onAction(formAction: ActionEmit<Form>, formType: FormType){
    if(formAction.actionType === Action.FORM_CHANGE){
      switch(formType){
        case FormType.Builder:{
          this.formsAction.emit(formAction);
          break;
        };
        case FormType.Properties: {
          this.formFieldsAction.emit({formIndex: this.parentFormIndex, formAction, formType: this.formType});
          break;
        };
        case FormType.PropertiesFormSwitches:{
          this.formFieldsAction.emit({formIndex: this.parentFormIndex, formAction, formType: this.formType});
          break;
        };
        case FormType.ForeignKeyConstraints:{
          this.formFieldsAction.emit({formIndex: this.parentFormIndex, formAction, formType: this.formType});
          break;
        };
        case FormType.CheckConstraints:{
          break;
        }
      }
    }else if(formAction.actionType === Action.BUTTON){
      this.onFormActionButtonClick(formAction.action);
    }
  }

  onKebabButtonClick(event: NavLink, formIndex: number, parametersFormIndex: number){
    switch(event.text){
      case 'Delete':{
        const parametersComponent = this.forms$$.value[formIndex].fields.find((field)=> {
          return field.inputType === FormInputType.CUSTOM && field.name === ComponentFieldName.PropertiesForm
        }) as ComponentField<IFormComponent>;

        parametersComponent.parameters.formTemplate$$.value.splice(parametersFormIndex, 1);
        parametersComponent.parameters.formTemplate$$.next(parametersComponent.parameters.formTemplate$$.value);
        this.forms$$.next(this.forms$$.value);
        break;
      }
    };
  }

  onFormActionButtonClick(buttonText: string){
    switch(buttonText){
      case 'table':{
        this.addForm();
        break;
      };
      case 'properties':{
        this.addFormProperty();
        break;
      };
      case 'check':{
        this.addFormCheckConstraint();
        break;
      };
      case 'foreign key':{
        this.addFormForeignKeyConstraint();
        break;
      }
      case 'conditions':{
        this.addFormCondition();
        break;
      }
    };
  }

}
