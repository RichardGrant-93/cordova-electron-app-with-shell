import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

export enum AdvancedTypes{
  MONEY
};

export interface AdvancedType<T1>{
  type: AdvancedTypes,
  value: T1
};

export interface contracts {
  contractId: string;
  jobType: string;
  contractType: string;
  distance: number;
  averagePrice: AdvancedType<number>;
  clientRating: number;
  sqft: number;
  completionEstimate: string;
}

const ELEMENT_DATA: contracts[] = [
  {contractId: '123', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'},
  {contractId: '123', jobType: 'Cut Grass', contractType: 'Recurring', distance: 50, averagePrice: { type: AdvancedTypes.MONEY, value: 60 }, clientRating: 5, sqft: 500, completionEstimate: '5 hours'}
];


@Component({
  selector: 'lib-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {
  hiddenColumns: string[] = ['contractId'];
  dataSource = ELEMENT_DATA;
  advancedTypes = AdvancedTypes;


  constructor() { 
  }

  ngOnInit(): void {

  }

  header(columnName: string){
    return columnName[0].toLocaleUpperCase() + columnName.replace(/(?<!^)([A-Z])/g, ' $1').slice(1);
  }

  get columns(){
    return Object.keys(this.dataSource[0]).filter((columnName)=> this.hiddenColumns.indexOf(columnName) === -1);
  }

  getContractId(index : number, contract : any) {
    return contract.id;
  }

}
