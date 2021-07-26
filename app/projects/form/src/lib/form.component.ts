import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form, FormField, FormInputType, Lookup } from './models/form.model';
import { isObjectValidation, validateValueWithList } from './validators/validOption';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionButton } from './models/actionButton.model';
import { ActionEmit } from './models/actionEmit.model';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'lib-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() formTemplate: Form[] = [];
  @Input() actionButtons: ActionButton[] = [];

  @Output() action:EventEmitter<ActionEmit<Form>> = new EventEmitter();

  public formInputType = FormInputType;

  forms: FormGroup[];


  name = "Angular";
  testForm: FormGroup;
  get selects() {
    return this.testForm.get("selects") as FormArray;
  }

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.forms = this.formTemplate.map((form: Form)=>{
      return this.fb.group(
        form.fields.map((field: FormField<any>)=>{ //map each form[] field
          return {
          [field.name]: //to an object key
          new FormControl(
            field.defaultValue, //and value
            this.getValidator<string>(field.inputType, field.options)
          )
          };
        }).reduce(((result, current) => Object.assign(result, current)), {}) //then reduce the array of objects to a flat object {[field:name]: Control}
      );
    });

    /*
      Form Control is either an object or string.
    */

    this.forms.forEach((form, formIndex)=>{//each form
      Object.keys(form.controls).forEach((fieldName: string)=>{//each field name
        this.forms[0].controls[fieldName].valueChanges.subscribe((change)=>{//field valueChanges
            //this.setToMatch(formIndex, fieldName, change);
        });
      });
    });
  }

  private setToMatch(formIndex: number, fieldName: string, test: any, selectFirstMatch: boolean = false, setToDefaultOnNull: boolean = false){
    const templateField = this.formTemplate[formIndex].fields.filter((field)=> field.name === fieldName)[0];
    const contains = templateField.options.filter((option)=>{//contains input text
      return option.value.toString().toLowerCase().indexOf(test.toString().toLowerCase()) !== -1;
    });
    if(contains.length >= 1 && selectFirstMatch){//set input to matched option
      if(test !== ""){
        this.forms[0].controls[fieldName].setValue(contains[0], { emitEvent: false });
      }
    }else if(setToDefaultOnNull){
      this.forms[0].controls[fieldName].setValue(templateField.defaultValue, { emitEvent: false });
    }
  }

  private getValidator<T1>(inputType: FormInputType, options: Lookup<T1>[]){
    if(this.formInputType.AUTO_COMPLETE_TEXT_INPUT === inputType){
      return [validateValueWithList(options)];
    }
    return [];
  }

  filterOptions(options: Lookup<any>[], input: Lookup<any>){
    return options.filter(option=>{
      if(input.value === "")
        return true;

      if(input.value !== undefined)
        return option.value.toString().toLowerCase().indexOf(input.value.toLowerCase()) !== -1
    });
  }

  getOptionText(option) {
    if(option && option.value)
      return option.value;
  }

  onClose(event: any, input: any, auto: any, formIndex: number, fieldName: string){
    this.setToMatch(formIndex, fieldName, input.value, true, true);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent, input: HTMLInputElement){
    console.log("onSelectedOption2", event, input);
    input.blur();
  }

}
