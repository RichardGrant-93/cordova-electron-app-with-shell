import {FocusMonitor} from '@angular/cdk/a11y';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { Lookup } from '../models/form.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatFormFieldControlExt } from '../ext/MatFormFieldControlExt';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: SwitchComponent}],
})
export class SwitchComponent extends MatFormFieldControlExt<boolean> implements OnInit {
  public readonly dropdownIcon: MaterialIcon = MaterialIcon.arrow_drop_down;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() options: Lookup<string>[] = [];

  @Input('control')
  formControl: FormControl;

  @Input()
  get value(): boolean {
    return this.formControl.value;
  }
  set value(val: boolean) {
    this.formControl.setValue(val);
    this.stateChanges.next();
  }


  get empty(): boolean {
      return this.inputIsEmpty;
  }

  get shouldLabelFloat(): boolean{
    return ((this.focused) && this.inputIsEmpty) || !this.inputIsEmpty;
  }


  get inputIsEmpty(){
    return false;
  }

  constructor(public _fb: FormBuilder, private _fm: FocusMonitor, private _elRef: ElementRef){
    super(_fm, _elRef);
    
  }

  ngOnInit(): void {
  }

  onSlideToggle(){
    console.log("event");
    this.value = !this.value;
  }

}