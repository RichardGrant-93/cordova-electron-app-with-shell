import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { HexCode } from '@library/ui-canvas/src/lib/ui-canvas.models';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @Output() getNodes: EventEmitter<void> = new EventEmitter();
  @Output() colors: any = new EventEmitter();
  colors_: any = {};

  constructor(private dialogRef: MatDialogRef<AdminPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data.colors)
      this.colors_ = this.data.colors;
  }

  onColorChange(event: Event, colorProperty: string){
    const color = (event.target as HTMLInputElement).value as HexCode;
    this.colors_[colorProperty] = color;
    this.colors.emit(this.colors_);
  }


  onCanvasBackgroundColorChange(event: Event){
    
  }

  getNodesClick(){
    this.getNodes.emit();
  }

  close(){
    this.dialogRef.close();
  }

  private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }
}
