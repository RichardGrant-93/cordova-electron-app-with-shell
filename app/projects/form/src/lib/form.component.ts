import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Form, FormField, FormInputType, } from './models/form.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActionButton } from './models/actionButton.model';
import { Action, ActionEmit } from './models/actionEmit.model';
import { first, map, tap } from 'rxjs/operators';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IHTML_INPUT_TYPE } from './text-input/models';


export interface PropertySettings{
  field: string,
  setting?: {
    property: string, 
    value: any
  }[]
};

@Component({
  selector: 'lib-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, AfterViewInit {

  @Input() formTemplate$$: BehaviorSubject<Form[]> = new BehaviorSubject([]);
  @Input() actionButtons$$: BehaviorSubject<ActionButton[]> = new BehaviorSubject([]);
  @Input() emitOnChange: boolean = false;
  @Input() actionButtonsRaised: boolean = true;

  @Output() action:EventEmitter<ActionEmit<Form>> = new EventEmitter();

  @ContentChild('customTemplate') customTemplate: TemplateRef<any>;

  public forms: FormGroup[];
  public formInputType = FormInputType;
  public readonly dropdownIcon: MaterialIcon = MaterialIcon.arrow_drop_down;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public readonly IHTML_INPUT_TYPES = IHTML_INPUT_TYPE;
  public readonly regexNumbersOnly = new RegExp(`^(-?[0-9]\\d*(\\.)?)?(\\d+)?$`);

  get formTemplate(){
    return this.formTemplate$$.value;
  }

  get actionButtons(){
    return this.actionButtons$$.value;
  }

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    
  }
  ngAfterViewInit(): void {
    this.forms.forEach((form)=>{
      console.log("do update");
      form.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.formTemplate$$.subscribe(()=>{
      this.forms = this.formTemplate.map((form: Form)=>{
        return this.fb.group(
          form.fields.map((field: FormField<any>)=>{ //map each form[] field
            return {
              [field.name]: new FormControl(field.defaultValue)
            };
          }).reduce(((result, current) => Object.assign(result, current)), {}) //then reduce the array of objects to a flat object {[field:name]: Control}
        );
      });
  
      this.forms.forEach((form, formIndex)=>{
        this.action.emit({
          action: 'initial',
          actionType: Action.BUTTON,
          form: {
            fields: formIndex >= 0? this.forms[formIndex].value : null,
            index: formIndex
          }
        });
        if(this.emitOnChange){
          form.valueChanges.pipe(tap((change)=>{
            this.action.emit({
              actionType: Action.FORM_CHANGE,
              form: {
                fields: form.value,
                index: formIndex
              },
            });
          })).subscribe();
        }
      });
    });
  }
  
  onAction(action: string, formIndex: number){
    this.action.emit({
      action: action,
      actionType: Action.BUTTON,
      form: {
        fields: formIndex >= 0? this.forms[formIndex].value : null,
        index: formIndex
      }
    });
  }
}
