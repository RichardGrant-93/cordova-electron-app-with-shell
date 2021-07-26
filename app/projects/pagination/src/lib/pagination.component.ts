import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'lib-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

  @Output() page: EventEmitter<PageEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onPage(pageEvent: PageEvent){
    this.page.emit(pageEvent);
  }

}
