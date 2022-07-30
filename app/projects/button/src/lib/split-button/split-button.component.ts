import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from '../button/button.component';

@Component({
  selector: 'lib-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss']
})
export class SplitButtonComponent implements OnInit {
  @Input() button: Button;
  @Input() actionButtonsRaised: boolean = true;

  @Output() selected: EventEmitter<Button['text']> = new EventEmitter<Button['text']>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(buttonText: Button['text']){
    this.selected.emit(buttonText);
  }

}
