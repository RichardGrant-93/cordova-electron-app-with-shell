import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Form, FormField, FormInputType, Lookup } from './models/form.model';

@Component({
  selector: 'lib-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formInputType = FormInputType;
  public formTemplate = [
      {
        fields: [
          {
            inputType: this.formInputType.AUTO_COMPLETE_TEXT_INPUT,
            defaultValue: {} as Lookup<string>,
            name: 'input1',
            placeholder: "Choose an option",
            options: [
              {id: 1, value: 'Item 1'},
              {id: 1, value: 'Item 2'},
              {id: 1, value: 'Item 3'}
            ] as Lookup<string>[],
            col: 2
          } as FormField<string>,
          {
            inputType: this.formInputType.AUTO_COMPLETE_TEXT_INPUT,
            defaultValue: {} as Lookup<string>,
            name: 'input2',
            placeholder: "Choose an option",
            options: [
              {id: 1, value: 'Item 1'},
              {id: 1, value: 'Item 2'},
              {id: 1, value: 'Item 3'}
            ] as Lookup<string>[],
            col: 2
          } as FormField<string>,
          {
            inputType: this.formInputType.AUTO_COMPLETE_TEXT_INPUT,
            defaultValue: {} as Lookup<string>,
            name: 'input3',
            placeholder: "Choose an option",
            options: [
              {id: 1, value: 'Item 1'},
              {id: 1, value: 'Item 2'},
              {id: 1, value: 'Item 3'}
            ] as Lookup<string>[],
            col: 2
          } as FormField<string>,
          {
            inputType: this.formInputType.AUTO_COMPLETE_TEXT_INPUT,
            defaultValue: {} as Lookup<string>,
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
    ] as Form[];

  forms: FormGroup[];

  constructor(private fb: FormBuilder) {
    this.forms = this.formTemplate.map((form: Form)=>{
      return this.fb.group(
        form.fields.map((field: FormField<any>)=>{
          return {[field.name]: new FormControl(field.defaultValue)}
        })
      );
    });
  }

  ngOnInit(): void {
  }

}
