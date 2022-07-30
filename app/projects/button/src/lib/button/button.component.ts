import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';

export interface Button{
  style: string;
  text: string;
  icon?: MaterialIcon;
  options?: Omit<Button, 'options'>[]
}

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() button: Button;
  @Input() actionButtonsRaised: boolean = true;

  @Output() selected: EventEmitter<Button['text']> = new EventEmitter<Button['text']>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(buttonText: Button['text']){
    this.selected.emit(buttonText);
  }

}
