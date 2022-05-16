import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatFormFieldControlExt } from '../ext/MatFormFieldControlExt';
import { validText } from '../validators/validText';
import { IHTML_INPUT_TYPE } from './models';

@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: TextInputComponent}],
})
export class TextInputComponent extends MatFormFieldControlExt<string> implements OnInit {
  public readonly dropdownIcon: MaterialIcon = MaterialIcon.arrow_drop_down;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  @Input('control')
  formControl: FormControl;

  @Input() type: IHTML_INPUT_TYPE;
  @Input() regex: RegExp = null;

  @Input()
  get value(): string {// not working
    return this.formControl.value || '';//might need to change this to input nativeElement for validation to work correctly
  }
  set value(val: string) {// not working
    this.formControl.setValue(val);
    this.input.nativeElement.value = val;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.inputIsEmpty;
  }

  get shouldLabelFloat(): boolean{
    return ((this.focused) && this.inputIsEmpty) || !this.inputIsEmpty;
  }

  get inputIsEmpty(){
    return !(this.input?.nativeElement?.value?.length > 0);
  }

  constructor(public _fb: FormBuilder, private _fm: FocusMonitor, private _elRef: ElementRef){
    super(_fm, _elRef);
  }

  ngOnInit(): void {
    this.formControl.setValidators([validText(this.required, this.regex)]);
    this.formControl.updateValueAndValidity();
  }

  onInput(event: any){
    const lastValue = this.formControl.value;
    if(this.regex && !this.regex.test(this.value)){
      this.value = lastValue;
    }else{
      this.value = this.input.nativeElement.value;
    }
  }
}