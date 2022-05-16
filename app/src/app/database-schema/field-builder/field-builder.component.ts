import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { Action, ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { Form, FormInputType } from '@library/form/src/lib/models/form.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { BehaviorSubject } from 'rxjs';
import { DatabaseSchemaStore } from '../component-store/database-schema.store';

@Component({
  selector: 'app-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss']
})
export class FieldBuilderComponent implements OnInit {
  readonly forms$$: BehaviorSubject<Form[]> = this.databaseSchemaStore.forms$$;
  readonly actionButtons$$: BehaviorSubject<ActionButton[]> = this.databaseSchemaStore.actionButtons$$;

  @Output() action: EventEmitter<ActionEmit<Form>> = new EventEmitter();

  public actions: NavLink[] = [
    {text: 'Remove', route: ''}
  ]
  
  constructor(private databaseSchemaStore: DatabaseSchemaStore) { }

  ngOnInit(): void {
  }

  addField(){
    this.databaseSchemaStore.addNewForm();
  }

  onAction(formAction: ActionEmit<Form>){
    if(formAction.actionType === Action.FORM_CHANGE){
      this.action.emit(formAction);
    }else if(formAction.actionType === Action.BUTTON && formAction.action === 'Add Field'){
      this.addField();
    }
    
  }

  onKebabButtonClick(event: NavLink, formIndex: number){
    switch(event.text){
      case 'Delete':{
        this.forms$$.value.splice(formIndex, 1);
        this.forms$$.next(this.forms$$.value);
        break;
      }
    };
  }

}
