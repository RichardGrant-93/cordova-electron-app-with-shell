import { Component, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { AdvancedType, AdvancedTypes } from './advanced-types.models';

@Component({
  selector: 'lib-advanced-types',
  templateUrl: './advanced-types.component.html',
  styleUrls: ['./advanced-types.component.scss']
})
export class AdvancedTypesComponent implements OnInit {
  @Input() advancedType: AdvancedType<any> = null;
  public advancedTypes = AdvancedTypes;
  constructor() { }

  ngOnInit(): void {
  }

  onClickChip(tooltip: MatTooltip){
    tooltip.disabled = false;
    tooltip.show();
    window.setTimeout(()=>{
      tooltip.hide();
      tooltip.disabled = true;
    }, 1000);
  }

  disableTooltip(tooltip: MatTooltip){
    tooltip.disabled = true;
  }
}
