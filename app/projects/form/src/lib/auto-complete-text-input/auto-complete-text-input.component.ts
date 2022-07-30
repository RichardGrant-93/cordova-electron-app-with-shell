import { FocusMonitor } from '@angular/cdk/a11y';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { MatFormFieldControlExt } from '../ext/MatFormFieldControlExt';
import { Lookup } from '../models/form.model';
import { FilterArrayOfObjects } from '../pipes/filterArrayOfObjects.pipe';
import { validOption } from '../validators/validOption';

@Component({
  selector: 'lib-auto-complete-text-input',
  templateUrl: './auto-complete-text-input.component.html',
  styleUrls: ['./auto-complete-text-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: AutoCompleteTextInputComponent}],
})
export class AutoCompleteTextInputComponent extends MatFormFieldControlExt<Lookup<string>> implements OnInit, OnChanges {
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

  constructor(private _fm: FocusMonitor, private _elRef: ElementRef, private filterArrayOfObjects: FilterArrayOfObjects){
    super(_fm, _elRef);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.options){
      const contains = this.fieldMatches(this.value?.value || '');
      if(contains.length === 0){
        this.value = null;
      }
    }
  }

  ngOnInit(): void {
    this.formControl.setValidators([validOption(this.options, this.required, this.mustBeValidOption)]);
    this.formControl.updateValueAndValidity();
  }

  getOptionText(option) {
    if(option && option.value)
      return option.value;
  }

  onBlur(){
    const test = this.autoInput.nativeElement.value;
    this.setToMatch(this.autoInput.nativeElement.value);
  }

  onClose(event: any){
    //this.setToMatch(this.autoInput.nativeElement.value, true);

  }

  onOpen(event: any){
    this.setToMatch(this.autoInput.nativeElement.value);
  }

  onChange(){
    console.log("onChange");
    const test = this.autoInput.nativeElement.value;
    const contains = this.fieldMatches(test);
    if(contains.length === 0){
      this.setToMatch(test);
    }
  }

  private fieldMatches(test: string){
    return this.filterArrayOfObjects.transform(this.options, 'value', test);
  }

  private setToMatch(test: string, clearIfNotExactMatch: boolean = false){
    const contains = this.fieldMatches(test);
    if(contains.length >= 1){
      if(test !== ""){
        this.formControl.setValue(contains[0]);
      }else{
        this.value = null;
        this.formControl.setValue(null);
      }
    }else{
      this.formControl.setValue(clearIfNotExactMatch? null : {id: null, value: test});
    }
    return contains;
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent){
    this.autoInput.nativeElement.blur();
  }

}
