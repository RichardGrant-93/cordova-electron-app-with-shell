import {FocusMonitor} from '@angular/cdk/a11y';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { Lookup } from '../models/form.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatFormFieldControlExt } from '../ext/MatFormFieldControlExt';

@Component({
  selector: 'lib-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ChipsComponent}],
})
export class ChipsComponent extends MatFormFieldControlExt<string> implements OnInit {
  public readonly dropdownIcon: MaterialIcon = MaterialIcon.arrow_drop_down;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('autoInput') autoInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  
  formGroup: FormGroup;

  @Input() options: Lookup<string>[] = [];
  @Input('control')
  private formControl_: FormControl;

  @Input()
  get value(): string {
    return this.formGroup.get('chips').value;
  }
  set value(val: string) {
    this.formGroup.get('chips').setValue(val);
    this.stateChanges.next();
  }

  get empty(): boolean {
      return this.chips.length === 0 || this.inputIsEmpty;
  }

  get shouldLabelFloat(): boolean{
    return (this.chips.length > 0) || ((this.focused) && this.inputIsEmpty) || !this.inputIsEmpty;
  }

  get chips(): Lookup<string>[]{
    return this.formGroup.get('chips').value;
  }
  
  get hasChips(){
    return this.chips.length > 0;
  }

  get inputIsEmpty(){
    return !(this.autoInput?.nativeElement?.value?.length > 0);
  }

  constructor(public _fb: FormBuilder, private _fm: FocusMonitor, private _elRef: ElementRef){
    super(_fm, _elRef);
    
  }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      input: '',
      chips: this.formControl_
    });
  }

  getOptionText(option) {
    if(option && option.value)
      return option.value;
  }
  addChip(event: MatChipInputEvent){
    const value = (event.value || '').trim();
    if(value.length > 0){
      const chipValues = this.chips;
      chipValues.push({id: null, value: value});
    }
    event.input.value = '';
  }

  removeChip(value: Lookup<string>){
    this.autoInput.nativeElement.blur()
    const chipValues = this.chips as Lookup<string>[];
    const matchedIndex = chipValues.findIndex((chip)=> chip === value);
    chipValues.splice(matchedIndex, 1);
  }

  onChipSelectedOption(event: MatAutocompleteSelectedEvent){
    const chipValues = this.chips;
    chipValues.push(event.option.value);
    this.autoInput.nativeElement.value = '';
    this.autoInput.nativeElement.blur();
  }

}