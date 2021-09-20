import { Component, Input, OnInit } from '@angular/core';

export enum AdvancedTypes{
  MONEY
};

export interface AdvancedType<T1>{
  type: AdvancedTypes,
  value: T1
};


@Component({
  selector: 'lib-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {
  hiddenColumns: string[] = ['contractId'];
  @Input() data = [];
  advancedTypes = AdvancedTypes;


  constructor() { 
  }

  ngOnInit(): void {

  }

  header(columnName: string){
    return columnName[0].toLocaleUpperCase() + columnName.replace(/(?<!^)([A-Z])/g, ' $1').slice(1);
  }

  get columns(){
    return Object.keys(this.data[0]).filter((columnName)=> this.hiddenColumns.indexOf(columnName) === -1);
  }

  getContractId(index : number, contract : any) {
    return contract.id;
  }
}
