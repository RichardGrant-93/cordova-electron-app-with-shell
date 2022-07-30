
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActionButton } from '@library/form/src/lib/models/actionButton.model';
import { ComponentField, Form, FormField, FormInputType, Lookup } from '@library/form/src/lib/models/form.model';
import { BehaviorSubject, iif, interval, Observable, of } from 'rxjs';

import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';
import { COLOR, HexCode } from '@library/ui-canvas/src/lib/ui-canvas.models';
import { FontFamily, FONTWEIGHT, ITableArgs, UiCanvasDirective, UICanvasKebabActionEmit } from '@library/ui-canvas/src/lib/ui-canvas.directive';

import {MatDialog} from '@angular/material/dialog';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TableSearchStore } from '@app/table-search/component-store/table-search.store';
import { Action, ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { CURSOR, MouseButton, MouseControllerDirective } from '@library/mouse-controller/src/lib/mouse-controller.directive';
import { debounceTime, delay, delayWhen, filter, find, first, last, map, mergeAll, switchMap, takeUntil, tap, throttleTime, withLatestFrom } from 'rxjs/operators';
import { ComponentFieldName, DatabaseSchemaStore } from './component-store/database-schema.store';
import { IFormComponent } from '@library/form/src/public-api';
import { FormType, IChildActionEmit } from './form-builder/form-builder.component';
import { VerticalNavigationService } from '@library/vertical-navigation/src/public-api';
import { SlideoutComponent } from '@library/slideout/src/projects';
import { KebabMenu } from '@library/kebab-menu/src/projects';
import { ContextMenuComponent } from '@library/ui-canvas/src/lib/context-menu/context-menu.component';
import { TooltipPosition } from '@angular/material/tooltip';
import ResizeObserver from 'resize-observer-polyfill';

enum ToolbarActions{
  SchematicPlugins = 'Schematic Plugins',
  AdminPanel = 'Admin Panel'
};

@Component({
  selector: 'app-database-schema',
  templateUrl: './database-schema.component.html',
  styleUrls: ['./database-schema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseSchemaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasWrapper') canvasWrapper_: ElementRef<HTMLDivElement>;
  @ViewChild(UiCanvasDirective) uiCanvas: UiCanvasDirective;
  @ViewChild(MouseControllerDirective) mouseController_: MouseControllerDirective;
  @ViewChild(SlideoutComponent) slideoutComponent_: SlideoutComponent;

  @ViewChildren('kebabContextMenus') kebabContextMenus: QueryList<ContextMenuComponent>;


  //public colors: string[] = ["#4A4E59", "#2F323C", "#2F5C6F", "#FFFFFF"];

  public readonly forms$$: BehaviorSubject<Form[]> = this.databaseSchemaStore.forms$$;
  public readonly actionButtons$$: BehaviorSubject<ActionButton[]> = this.databaseSchemaStore.actionButtons$$;
  public readonly formType = FormType;

  readonly toolbarActions: NavLink[] = [
    {
      icon: MaterialIcon.add_box,
      text: ToolbarActions.SchematicPlugins,
      route: ''
    },
    {
      icon: MaterialIcon.admin_panel_settings,
      text: ToolbarActions.AdminPanel,
      route: ''
    }
  ];

  public selectedFormIndex$$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  private adminColors_: {
    border: HexCode,
    title: HexCode,
    background: HexCode,
    dataTypeCell: HexCode,
    FK: HexCode,
    textColor: HexCode,
    borderOnHover: HexCode,
    constraintColor: HexCode,
    selectedTable: HexCode,
  } = {
    border: '#DEDEDE' as HexCode, //grey
    title: '#FFFFFF' as HexCode, //white
    background: '#21373F' as HexCode, //dark
    dataTypeCell: '#00E1FF' as HexCode,//blue
    FK: '#FFC21A' as HexCode, //yellow
    textColor: '#DEDEDE' as HexCode, //grey
    borderOnHover: '#FFFFFF' as HexCode,//white
    constraintColor: '#FFFFFF' as HexCode,//white
    selectedTable: '#00E1FF' as HexCode,//blue
  }

  get canvasWrapper(){
    return this.canvasWrapper_?.nativeElement;
  }

  name: string = 'test';
  footerNavLinks: NavLink[] = [{text: 'Logout', route: ''}];
  position: TooltipPosition = 'below';
  
  navLinks = [
    {
      icon: MaterialIcon.manage_accounts,
      text: 'Account Settings',
      route: '/search/table/search'
    },
    {
      icon: MaterialIcon.public,
      text: 'Organization Settings',
      route: '/search/table/search'
    },
    {
      icon: MaterialIcon.settings_applications,
      text: 'App Settings',
      route: '/search/table/search'
    },
    {
      icon: MaterialIcon.help,
      text: 'Support',
      route: '/search/table/search'
    },
    {
      icon: MaterialIcon.memory,
      text: 'Database Schema',
      route: '/database-schema/database-schema'
    },
  ];

  get contextMenus(){
    return this.uiCanvas?.contextMenus || [];
  }
  

  get tempContextMenu(): NavLink[]{
    return [
      {icon: MaterialIcon.traffic, text: 'Test 1', route: ''},
      {icon: MaterialIcon.delete, text: 'Test 2', route: ''},
      {icon: MaterialIcon.add, text: 'Test 3', route: ''}
    ];
  }

  constructor(private databaseSchemaStore: DatabaseSchemaStore, 
    public dialog: MatDialog, 
    private tableSearchStore: TableSearchStore,
    private vn: VerticalNavigationService
  ) {
    
  }
  ngOnDestroy(): void {
    this.vn.isMini$$.next(false);
  }

  ngOnInit(): void {
    this.vn.isMini$$.next(true);
  }

  ngAfterViewInit(): void {

    this.canvasWrapperResizeWatch();
     
    this.mouseController_.dragging.pipe(
      filter((dragging)=>!!dragging && this.slideoutComponent_.hasAnimationFinished),
      tap((event)=>{
        if(event.mouseDown[MouseButton.LEFT]){
          this.slideoutComponent_.preventPointerEvents.next(true);
          if(this.slideoutComponent_.isSlideoutOpen && this.uiCanvas.isDragging){
            if(event.event.offsetX >= this.uiCanvas.width - this.slideoutComponent_.slideoutWidth - 100){
              this.slideoutComponent_.isSlideoutOpen = false;
            }
          }else{
            if(event.event.offsetX <= this.uiCanvas.width - this.slideoutComponent_.slideoutWidth - 100){
              this.slideoutComponent_.isSlideoutOpen = true;
            }
          }
        }else{
          this.slideoutComponent_.preventPointerEvents.next(false);
        }
        this.slideoutComponent_.slideoutSlideoutWrapper.nativeElement
      }),
    ).pipe(
    ).subscribe();

    this.selectedFormIndex$$.pipe().subscribe(()=>{
      this.forms$$.next(this.forms$$.value);
    });
  }

  tablePropertiesForm(){

    this.forms$$.pipe().subscribe((forms)=>{
      this.uiCanvas.clearLinks();
      forms.forEach((form, formIndex)=>{
        const tablePropertiesForm = form.fields.find((formFields)=> formFields.inputType === FormInputType.CUSTOM && formFields.name === ComponentFieldName.PropertiesForm) as ComponentField<IFormComponent>;
        const tableProperties = tablePropertiesForm.parameters.formTemplate$$.value.map((formTemplate)=>{
          return {...formTemplate, fields: [].concat.apply([], formTemplate.fields.map((field)=>{
            if(field.name === ComponentFieldName.PropertiesFormSwitches)
              return ((field as ComponentField<IFormComponent>).parameters.formTemplate$$.value as Form[])[0].fields;
            return [field];
          }))};
        });

        const tableFkConstraintsForm = form.fields.find((formFields)=> formFields.inputType === FormInputType.CUSTOM && formFields.name === ComponentFieldName.ForeignKeyConstraint) as ComponentField<IFormComponent>;

        const fkConstraints = tableFkConstraintsForm.parameters.formTemplate$$.value.map((formTemplate, formTemplateIndex)=>{
          return (formTemplate.fields.find(field=> field.name === `form-${formIndex}-property1-${formTemplateIndex}-fk-constraint`) as FormField<string>).value;
        }).filter(lookup=>!!lookup).map((lookup: Lookup<string>)=>{
          return [ this.databaseSchemaStore.mapPropertyName(lookup.value), "FK", "", ""];
        });

        const formPropertiesRows = this.databaseSchemaStore.tableData(tableProperties);
        const tableName = form.fields[0] as FormField<any>;
        this.buildTable(formPropertiesRows, fkConstraints, tableName.defaultValue, formIndex, {
          icon: MaterialIcon.more_vert,
          navLinks: [
            {
              icon: MaterialIcon.add,
              text: 'add',
              route: ''
            }
          ],
          footerNavLinks: [
            {
              icon: MaterialIcon.delete,
              text: 'delete',
              route: ''
            }
          ]
        });

        const tableForeignKeyConstraints = form.fields.find((formFields)=> formFields.inputType === FormInputType.CUSTOM && formFields.name === ComponentFieldName.ForeignKeyConstraint) as ComponentField<IFormComponent>;
        tableForeignKeyConstraints.parameters.formTemplate$$.value.map((tableForeignKeyConstraint, tableForeignKeyConstraintIndex)=>{
          const fkconstraintField = tableForeignKeyConstraint.fields.find((field)=>field.name === `form-${formIndex}-property1-${tableForeignKeyConstraintIndex}-fk-constraint`) as FormField<string>
          if(fkconstraintField.value)
            return (fkconstraintField.value as Lookup<string>).value;
        }).filter((linkToTableField=>!!linkToTableField)).forEach((linkToTableField)=>{
          this.uiCanvas.drawLink(linkToTableField.split('.')[0] + '.bounds', tableName.value + '.bounds', this.adminColors_.border);
        });
      });
    });

    /*
    this.databaseSchemaStore.addNewForm();
    this.databaseSchemaStore.addNewForm();
    this.uiCanvas.drawLink('My Table0.bounds', 'My Table1.bounds', this.adminColors_.border);*/
  }

  canvasWrapperResizeWatch(){
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
          const { width, height} = entry.contentRect;
          this.uiCanvas.setCanvasDimensions(width, height);
          this.tablePropertiesForm();
      }
    });
    ro.observe(this.canvasWrapper);
  }

  buildTable(rows: string[][], fkConstraints: string[][], tableTitle: string, formIndex: number, kebabMenu: KebabMenu){
    const hasRows = rows.length > 1;
    rows.splice(1, 0, ...fkConstraints);
    let oldBounds = {x: this.uiCanvas.centerPoint.x - ((550/2) / this.uiCanvas.zoomSettings.scale), y: this.uiCanvas.centerPoint.y, width: 200, height: 100};
    if(this.uiCanvas.groupManifest[tableTitle]){
      oldBounds = this.uiCanvas.groupManifest[tableTitle].objects.find(object=>object.args.objectName === 'bounds').args.bounds;
    }
    
    this.uiCanvas.drawTable({
      titlePrefix: {
        text: MaterialIcon.table,
        fontFamily: FontFamily.Material_Icons,
        fontWeight: FONTWEIGHT.NORMAL,
        fontSize: 12,
        color: this.adminColors_.title
      },
      title:{
        text: tableTitle,
        fontFamily: FontFamily.Sans_Serif,
        fontWeight: FONTWEIGHT.NORMAL,
        fontSize: 12,
        color: this.adminColors_.title
      },
      objectName: tableTitle,
      groupName: tableTitle,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: this.selectedFormIndex$$.value === formIndex? this.adminColors_.selectedTable : this.adminColors_.border,
      backgroundColor: this.adminColors_.background,
      bounds: oldBounds,
      cellSpacing: 10,
      cursor: CURSOR.DEFAULT,
      warning: {
        text: rows.length === 0? "table is empty" : "",
        fontFamily: FontFamily.Sans_Serif,
        fontWeight: FONTWEIGHT.NORMAL,
        fontSize: 12,
        color: this.adminColors_.title
      },
      kebabMenu: ()=>{
        return {
          object: {
            func: this.uiCanvas.drawText,
            args: {
              text: {
                  text: MaterialIcon.more_vert,
                  color:this.cellColor(0, 0, hasRows),//'#d3d6da' as HexCode,
                  fontFamily: FontFamily.Material_Icons,
                  fontWeight: FONTWEIGHT.LIGHTER,
                  fontSize: 13,
              },
              bounds: {x: 0, y: 0, width: 0, height: 0},
              groupName: tableTitle,
              objectName: `kebab`,
              options: [{icon: MaterialIcon.delete, text: 'Delete', route: ''}, {icon: MaterialIcon.add, text: 'Add', route: ''}] as NavLink[],
              events: {
                onHover: (onjArgs)=>{
                  return {
                    text: {
                      ...onjArgs.text,
                      color:COLOR.RED
                    },
                    cursor: CURSOR.POINTER
                  }
                }
              }
            },
            drawFromLog: false
          },
          events: {}
        }
      },
      rows: rows.map((rowVal, rowIndex)=>{
        return {
          cells: rowVal.map((cellVal, cellIndex)=>{
            return {
              object: {
                func: this.uiCanvas.drawText,
                args: {
                  text: {
                      text: `${cellVal || ''}`,
                      color: this.cellColor(rowIndex, cellIndex, hasRows, fkConstraints.length),//'#d3d6da' as HexCode,
                      fontFamily: "sans-serif",
                      fontWeight: rowIndex === 0 ? FONTWEIGHT.BOLD : FONTWEIGHT.LIGHTER,
                      fontSize: rowIndex === 0 ? 12 : 12,
                  },
                  bounds: {x: 0, y: 0, width: 0, height: 0},
                  groupName: tableTitle,
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
      }) as ITableArgs['rows'],
      events: {
        onMouseDown: (obj)=>{
          this.selectedFormIndex$$.next(formIndex);
          return {};
        },
        onDrag: this.uiCanvas.onDragEvent.bind(this.uiCanvas),
        onHover: (obj)=>{
          return {
            borderColor: this.selectedFormIndex$$.value === formIndex? this.adminColors_.selectedTable : this.adminColors_.borderOnHover,
            cursor: CURSOR.GRAB
          }
        },
      }
    });
  }

  private cellColor(rowIndex:number, cellIndex: number, hasRows: boolean = true, fkConstraintsLength: number = 0){

    if(!hasRows){
      if(cellIndex === 1){
        return this.adminColors_.FK as HexCode;
      }
    }else if(rowIndex === 0 && hasRows){
      return this.adminColors_.textColor as HexCode;
    }else{
      if(rowIndex > (fkConstraintsLength) && hasRows && cellIndex === 1){
        return this.adminColors_.dataTypeCell as HexCode;
      }else if(rowIndex <= (fkConstraintsLength) && hasRows && cellIndex === 1){
        return this.adminColors_.FK as HexCode;
      }
      
    }
    return this.adminColors_.textColor as HexCode;
  }

  onToolbarAction(action: NavLink){
    switch(action.text){
      case ToolbarActions.SchematicPlugins: {
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
      this.forms$$.next(this.forms$$.value);
    });

    dialog.componentInstance.getNodes.subscribe(()=>{
    });
  }


  onFormsAction(formAction: ActionEmit<Form>){
    if(formAction.actionType === Action.FORM_CHANGE){
      const formFields = this.forms$$.value[formAction.form.index].fields.filter(fields=>{
        return fields.inputType !== FormInputType.CUSTOM;
      }) as FormField<any>[];

      const namefieldReg = new RegExp(`^form-([0-9]+)-name$`)

      Object.keys(formAction.form.fields).forEach((fieldName)=>{
        const fieldToUpdate = formFields.find(formField=> formField.name === fieldName);
        if(namefieldReg.test(fieldName)){
          if (fieldToUpdate.defaultValue !== formAction.form.fields[fieldName]) {
            this.uiCanvas.groupManifest[formAction.form.fields[fieldName]] = this.uiCanvas.groupManifest[fieldToUpdate.defaultValue];
            delete this.uiCanvas.groupManifest[fieldToUpdate.defaultValue];
          }
        }
        

        if(fieldToUpdate){
          fieldToUpdate.defaultValue = formAction.form.fields[fieldName];
        }
      });

      this.forms$$.next(this.forms$$.value);
    }
  }

  onFormPropertiesAction(childFormAction: IChildActionEmit<Form>){
    if(childFormAction.formType === FormType.Properties){
      if(childFormAction.formAction.actionType === Action.FORM_CHANGE){
        const propertiesFormTemplate$$ = ((this.forms$$.value[childFormAction.formIndex].fields).find(fields=>{
          return fields.inputType === FormInputType.CUSTOM && fields.name === ComponentFieldName.PropertiesForm;
        }) as ComponentField<IFormComponent>).parameters.formTemplate$$;
  
        if(propertiesFormTemplate$$.value.length > 0){
          Object.keys(childFormAction.formAction.form.fields).forEach((fieldName)=>{
            const fieldToUpdate = propertiesFormTemplate$$.value[childFormAction.formAction.form.index].fields.find((propertyField: FormField<any>)=>{
              return propertyField.name === fieldName;
            }) as FormField<any>;
    
            if(fieldToUpdate)
              fieldToUpdate.defaultValue = childFormAction.formAction.form.fields[fieldName];
    
              propertiesFormTemplate$$.next(propertiesFormTemplate$$.value);
          });
        }
      }
    }else if(childFormAction.formType === FormType.PropertiesFormSwitches){
      const propertiesFormTemplate$$ = ((this.forms$$.value[childFormAction.formIndex].fields).find(fields=>{
        return fields.inputType === FormInputType.CUSTOM && fields.name === ComponentFieldName.PropertiesForm;
      }) as ComponentField<IFormComponent>).parameters.formTemplate$$;

      const propertiesFormSwitchesTemplate = propertiesFormTemplate$$.value.map((propertiesFormTemplate)=>{
        return propertiesFormTemplate.fields.find(field=> field.name === ComponentFieldName.PropertiesFormSwitches);
      }).forEach((form: ComponentField<IFormComponent>)=>{
        if(form.parameters.formTemplate$$.value.length > 0){
          Object.keys(childFormAction.formAction.form.fields).forEach((fieldName)=>{
          
            const fieldToUpdate = form.parameters.formTemplate$$.value[childFormAction.formAction.form.index].fields.find((propertyField: FormField<any>)=>{
              return propertyField.name === fieldName;
            }) as FormField<any>;

            if(fieldToUpdate)
              fieldToUpdate.defaultValue = childFormAction.formAction.form.fields[fieldName];
          });
        }
      });
    }
    this.forms$$.next(this.forms$$.value);
  }

  onZoom(e: WheelEvent){
    e.preventDefault();
    return this.uiCanvas.onZoom(e);
  }

  onCanvasKebabAction(kebabAction: UICanvasKebabActionEmit){
    this.kebabContextMenus.find((kcm)=> {
      return kcm.groupName === kebabAction.groupName && kcm.objectName === kebabAction.objectName;
    }).open(kebabAction.openAt);
    //this.kebabContextMenus.find(kcm=>kcm.name === objectName);
  }

  contextMenuTrackByFn(index, contextMenu){
    return contextMenu.args.groupName + '-' + contextMenu.args.objectName;
  }
}
