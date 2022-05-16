import { FocusMonitor } from '@angular/cdk/a11y';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { MatFormFieldControlExt } from '../ext/MatFormFieldControlExt';
import { Lookup } from '../models/form.model';
import { validOption } from '../validators/validOption';

@Component({
  selector: 'lib-auto-complete-text-input',
  templateUrl: './auto-complete-text-input.component.html',
  styleUrls: ['./auto-complete-text-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: AutoCompleteTextInputComponent}],
})
export class AutoCompleteTextInputComponent extends MatFormFieldControlExt<Lookup<string>> implements OnInit {
  public readonly dropdownIcon: MaterialIcon = MaterialIcon.arrow_drop_down;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('autoInput') autoInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  
  @Input() options: Lookup<string>[] = [];
  @Input('control')
  formControl: FormControl;

  @Input() mustBeValidOption: boolean = true;

  @Input()
  get value(): Lookup<string> {
    return this.formControl.value;
  }
  set value(val: Lookup<string>) {
    this.formControl.setValue(val);
    this.autoInput.nativeElement.value = val?.value || null;
    this.stateChanges.next();
  }

  get empty(): boolean {
      return this.inputIsEmpty;
  }

  get shouldLabelFloat(): boolean{
    return ((this.focused) && this.inputIsEmpty) || !this.inputIsEmpty;
  }

  get inputIsEmpty(){
    return !(this.autoInput?.nativeElement?.value?.length > 0);
  }

  constructor(private _fm: FocusMonitor, private _elRef: ElementRef){
    super(_fm, _elRef);
  }

  ngOnInit(): void {
    this.formControl.setValidators([validOption(this.options, this.required, this.mustBeValidOption)]);
    this.formControl.updateValueAndValidity();
  }

  getOptionText(option) {
    if(option && option.value)
      return option.value;
  }

  onClose(event: any){
    this.setToMatch(this.autoInput.nativeElement.value);
  }

  onOpen(event: any){
    this.setToMatch(this.autoInput.nativeElement.value);
  }

  onChange(){
    const test = this.autoInput.nativeElement.value;
    const contains = this.fieldMatches(test);
    if(contains.length === 0){
      this.formControl.setValue({id: null, value: test});
    }
  }

  private fieldMatches(test: string){
    return this.options.filter((option)=>{
      return option.value.toString().toLowerCase().indexOf(test.toString().toLowerCase()) !== -1;
    });
  }

  private setToMatch(test: string){
    const contains = this.fieldMatches(test);
    if(contains.length >= 1){
      if(test !== ""){
        this.value = contains[0];
      }else{
        this.value = null;
      }
    }else{
      this.value = {id: null, value: test};
    }
    return contains;
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent){
    this.autoInput.nativeElement.blur();
  }

}
