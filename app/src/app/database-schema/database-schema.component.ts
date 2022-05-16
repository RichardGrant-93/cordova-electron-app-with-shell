
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { Form, FormField, FormInputType } from '@library/form/src/lib/models/form.model';
import { BehaviorSubject } from 'rxjs';

import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { COLOR, HexCode } from '@library/ui-canvas/src/lib/ui-canvas.models';
import { FONTWEIGHT, UiCanvasDirective } from '@library/ui-canvas/src/lib/ui-canvas.directive';

import {MatDialog} from '@angular/material/dialog';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TableSearchStore } from '@app/table-search/component-store/table-search.store';
import { Action, ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { CURSOR } from '@library/mouse-controller/src/lib/mouse-controller.directive';
import { map } from 'rxjs/operators';
import { DatabaseSchemaStore } from './component-store/database-schema.store';

enum ToolbarActions{
  AddTable = 'Add Table',
  AdminPanel = 'Admin Panel'
};

@Component({
  selector: 'app-database-schema',
  templateUrl: './database-schema.component.html',
  styleUrls: ['./database-schema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabaseSchemaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasWrapper', { static: true }) canvasWrapper_: ElementRef<HTMLDivElement>;
  @ViewChild(UiCanvasDirective) uiCanvas: UiCanvasDirective;


  //public colors: string[] = ["#4A4E59", "#2F323C", "#2F5C6F", "#FFFFFF"];

  readonly forms$$: BehaviorSubject<Form[]> = this.databaseSchemaStore.forms$$;
  readonly actionButtons$$: BehaviorSubject<ActionButton[]> = this.databaseSchemaStore.actionButtons$$;

  readonly toolbarActions: NavLink[] = [
    {
      icon: MaterialIcon.add_box,
      text: ToolbarActions.AddTable,
      route: ''
    },
    {
      icon: MaterialIcon.admin_panel_settings,
      text: ToolbarActions.AdminPanel,
      route: ''
    }
  ];

  private adminColors_: {
    fontColor: HexCode,
    fontColorHover: HexCode,
    borderColor: HexCode,
    backgroundColor: HexCode,
    canvasBackgroundColor: HexCode,
    rowColor: HexCode,
    alternateRowColor: HexCode,
  } = {
    fontColor: '#f2f2f2' as HexCode,
    fontColorHover: '#ffffff' as HexCode,
    borderColor: '#3d4f7b' as HexCode,
    backgroundColor: '#2c3b5e' as HexCode, //2c3b5e
    canvasBackgroundColor: '#101623' as HexCode,
    rowColor: "#232f4d" as HexCode, //1e273e
    alternateRowColor: "#3d4f7b" as HexCode //3d4f7b
  }

  get canvasWrapper(){
    return this.canvasWrapper_?.nativeElement;
  }

  constructor(private databaseSchemaStore: DatabaseSchemaStore, public dialog: MatDialog, private cd: ChangeDetectorRef, private tableSearchStore: TableSearchStore) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.onResize();;
    }, 1);
  }

  onResize(){
    this.uiCanvas.setCanvasDimensions(this.canvasWrapper.offsetWidth, this.canvasWrapper.offsetHeight);
    this.forms$$.pipe(map(this.databaseSchemaStore.tableData)).subscribe((rows: string[][])=>{
      this.buildTable(rows);
    });
  }

  buildTable(rows: string[][]){
    console.log("build table", rows);
    let oldBounds = {x: 50, y: 0, width: 200, height: 100};
    if(this.uiCanvas.groupManifest['table']){
      oldBounds = this.uiCanvas.groupManifest['table'].objects.find(object=>object.args.objectName === 'bounds').args.bounds;
    }
    this.uiCanvas.drawTable({
      objectName: 'table1',
      groupName: 'table',
      borderWidth: 2,
      borderRadius: 25,
      borderColor: '#575b68' as HexCode,
      backgroundColor: '#24262d' as HexCode,
      bounds: oldBounds,
      cellSpacing: 15,
      cursor: CURSOR.DEFAULT,
      rows: rows.map((rowVal, rowIndex)=>{
        return {
          cells: rowVal.map((cellVal, cellIndex)=>{
            return {
              object: {
                func: this.uiCanvas.drawText,
                args: {
                  text: `${cellVal}`,
                  color: rowIndex === 0? this.cellColor(0) : this.cellColor(cellIndex),//'#d3d6da' as HexCode,
                  fontFamily: "sans-serif",
                  fontWeight: rowIndex === 0 ? FONTWEIGHT.BOLD : FONTWEIGHT.NORMAL,
                  fontSize: rowIndex === 0 ? 14 : 12,
                  bounds: {x: 0, y: 0, width: 0, height: 0},
                  groupName: 'table',
                  objectName: `row${rowIndex}.cell${cellIndex}`,
                  cursor: CURSOR.GRAB,
                  events: {
                    onHover: (obj)=>{
                      return {
                        color: COLOR.WHITE,
                        cursor: CURSOR.POINTER,
                      }
                    }
                  }
                },
                drawFromLog: false
              },
              events: {}
            }
          })
        };
      }),
      events: {
        onDrag: this.uiCanvas.onDragEvent.bind(this.uiCanvas),
        onHover: (obj)=>{
          return {
            borderColor: '#767b8d' as HexCode,
            cursor: CURSOR.GRAB
          }
        },
      }
    });
  }

  private cellColor(cellIndex: number){
    switch(cellIndex){
      case 1: {
        return '#fc7917' as HexCode;
      };
      default: {
        return '#d3d6da' as HexCode;
      }
    }
  }

  onToolbarAction(action: NavLink){
    switch(action.text){
      case ToolbarActions.AddTable: {
        //add table
        break;
      };
      case ToolbarActions.AdminPanel:{
        this.openAdminPanel();
        break;
      }
    }
  }


  openAdminPanel() {
    const dialog = this.dialog.open(AdminPanelComponent, {hasBackdrop: false, data: {colors: this.adminColors_}});

    dialog.componentInstance.colors.subscribe((colors)=>{
      this.adminColors_ = colors;
      ///this.updateTable(this.canvasElements[0], this.tableMock("table1", [["Cell 1", "Cell 2"], ["Cell 1", "Cell 2"]]));
    });

    dialog.componentInstance.getNodes.subscribe(()=>{
    });
  }


  onAction(formAction: ActionEmit<Form>){
    if(formAction.actionType === Action.FORM_CHANGE){
      Object.keys(formAction.form.fields).forEach((fieldName)=>{
        const fieldToUpdate = (this.forms$$.value[formAction.form.index].fields as FormField<any>[]).filter(fields=>{
          return fields.inputType !== FormInputType.CUSTOM;
        }).find(field=>field.name === fieldName);
        if(fieldToUpdate)
          fieldToUpdate.defaultValue = formAction.form.fields[fieldName];
      });
      this.forms$$.next(this.forms$$.value);
    }
  }

  onZoom(e: WheelEvent){
    e.preventDefault();
    return this.uiCanvas.onZoom(e);
  }
}
