import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy } from "@angular/core";
import { MatFormFieldControl } from "@angular/material/form-field";
import { Subject } from "rxjs";

@Component({
    template: '',
    host: {
        '[id]': 'id',
        '[attr.aria-describedby]': 'describedBy',
    }
  })
  export abstract class MatFormFieldControlExt<T> implements MatFormFieldControl<T>, OnDestroy {
    static nextId = 0;
    stateChanges = new Subject<void>();
    focused = false;
    ngControl = null;
    errorState = false;
    controlType = 'custom-control';
    id = `${this.controlType}-${MatFormFieldControlExt.nextId++}`;
    describedBy = '';
  
    @Input()
    get placeholder() { return this._placeholder; }
  
    
    set placeholder(plh) {
      this._placeholder = plh;
      this.stateChanges.next();
    }
    private _placeholder: string;
  
    @Input()
    get required() { return this._required; }
    set required(req) {
      this._required = coerceBooleanProperty(req);
      this.stateChanges.next();
    }
    private _required = false;
  
    @Input()
    get disabled() { return this._disabled; }
    set disabled(dis) {
      this._disabled = coerceBooleanProperty(dis);
      this.stateChanges.next();
    }
    private _disabled = false;
  
    abstract get value(): T;
    abstract set value(val: T);
    abstract get empty(): boolean;
  
  
    abstract get shouldLabelFloat(): boolean;
  
    constructor(private fm: FocusMonitor, private elRef: ElementRef) {
      fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    }
    autofilled?: boolean;
    userAriaDescribedBy?: string;
  
    ngOnDestroy() {
      this.stateChanges.complete();
      this.fm.stopMonitoring(this.elRef.nativeElement);
    }
  
    setDescribedByIds(ids: string[]) {
      this.describedBy = ids.join(' ');
    }
  
    onContainerClick(event: MouseEvent) {
      if ((event.target as Element).tagName.toLowerCase() != 'input') {
        this.elRef.nativeElement.querySelector('input').focus();
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }