import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Point } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Bounds, HexCode } from './ui-canvas.models';
import { skipWhile } from 'rxjs/operators';
import { CURSOR, MouseControllerDirective } from '@library/mouse-controller/src/lib/mouse-controller.directive';
import { COLOR } from './ui-canvas.models';

export enum FONTWEIGHT {
  BOLD = 'Bold',
  BOLDER = 'Bolder',
  NORMAL = 'Normal',
  LIGHTER = 'Lighter',
  _100 = '100',
  _200 = '200',
  _300 = '300',
  _400 = '400',
  _500 = '500',
  _600 = '600',
  _700 = '700',
  _800 = '800',
  _900 = '900',
};

interface IManifestEvent<T>{
  onHover?: (objArgs: T, event: MouseEvent, anchorPoint: Point)=> {};
  onClick?: (objArgs: T, event: MouseEvent, anchorPoint: Point)=> {};
  onDrag?: (objArgs: T, event: MouseEvent, anchorPoint: Point)=> {};
  onRedraw?: (objArgs: T)=> {};
  settings?: {
    isHover: boolean,
    beforeOnHover?: any,
    isClick: boolean,
    beforeOnClick?: any
    isDrag: boolean,
    beforeOnDrag?: any
  }
};

interface IGroupManifestFunc<T>{
  groupName: string, 
  objectName: string,
  events?: IManifestEvent<T>,
  cursor?: CURSOR,
};

interface IBoundsFunc extends IGroupManifestFunc<IBoundsFunc>{
  bounds: Bounds,
  backgroundColor?: COLOR | HexCode,
  borderColor?: COLOR | HexCode,
  borderRadius?: number,
  borderWidth?: number,
  clip?: IBoundsFunc
};

interface IFillTextFunc extends IGroupManifestFunc<IFillTextFunc>{
  text?: string;
  color?: COLOR | HexCode;
  fontFamily?: string;
  fontWeight?: FONTWEIGHT;
  fontSize?: number;
  bounds?: Bounds;
}

interface ICanvasObject{
  func: Function,
  args: any,
  drawFromLog: boolean,
};

interface IGroupManifest{
  [key: string]: {
    objects: ICanvasObject[],
    events?: IManifestEvent<any>
  }
}

interface Table extends IGroupManifestFunc<Table>{
  bounds: Bounds;
  cellSpacing: number;
  borderWidth: number;
  borderColor?: COLOR | HexCode;
  backgroundColor?: COLOR | HexCode;
  borderRadius?: number;
  rows: {
    cells: {
      object: ICanvasObject,
      events: IManifestEvent<any>
    }[]
  }[]
}

@Directive({
  selector: 'canvas[ui-canvas]',
})
export class UiCanvasDirective implements AfterViewInit{
  private canvas_: HTMLCanvasElement;
  public width = 0;
  public height = 0;


  public zoomSettings = {
    scaleFactor: 0.02,
    scrollX: 0,
    scrollY: 0,
    scale: 1
  };

  private cursorPosition = new BehaviorSubject<Point>({x: -1, y: -1});
  private isDragging_ = false;

  public groupManifest: IGroupManifest = {};

  get groupManifestBounds() {
    return Object.values(this.groupManifest).map(group=>{
      group.objects.map(obj=>{
        obj.args
      })
    })
  }

  get defaultEventSettings(){
    return {
      isHover: false,
      isClick: false,
      isDrag: false,
    }
  }

  get eventfulManifest(){//returns GROUPNAME.OBJECTNAME.[events.join(',')]
    const groups = Object.keys(this.groupManifest);
    return groups.map((groupName)=>{
      return [
        [groupName + '.[' + Object.keys(this.groupManifest[groupName]?.events || []).join(',') + ']'],
        this.groupManifest[groupName].objects.map((obj)=>{
          return groupName + '.' + obj.args.objectName + '.[' + Object.keys(obj.args?.events || []).join(',') + ']';
        })
      ].reduce((accumulator, value) => accumulator.concat(value), [])
    });
  }


  get canvas(){
    return this.canvas_;
  }

  get context(){
    return this.canvas.getContext('2d');
  }

  constructor(private el: ElementRef<HTMLCanvasElement>, private mouseController: MouseControllerDirective){
    this.canvas_ = this.el.nativeElement;
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.render();
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  event(
    eventName: string, 
    event: MouseEvent, 
    entryCondition?: (obj: ICanvasObject)=> boolean, 
    whileCondition?: (obj: ICanvasObject)=> boolean, 
    exitCondition?: (obj: ICanvasObject)=> boolean, 
    doOnEntry?: (obj: ICanvasObject, debug: string) => void, 
    doOnwhile?:  (obj: ICanvasObject, debug: string) => void, 
    doOnExit?:  (obj: ICanvasObject, debug: string) => void, 
    anchorPoint?: Point
  ){
    eventName = this.capitalizeFirstLetter(eventName);

    if(this.isDragging_ && eventName !== 'Drag')
      return;

    Object.keys(this.groupManifest).forEach((groupName)=>{
      //entry event
      if(entryCondition){

        //group
        if(this.groupManifest[groupName].events && 
          this.groupManifest[groupName].events['on' + eventName] && 
          !this.groupManifest[groupName].events.settings['is' + eventName] &&
          this.groupManifest[groupName].objects.some((obj)=> entryCondition(obj))
        ){
          this.groupManifest[groupName].objects.forEach((obj)=>{
            if(obj.args.events.settings['beforeOn' + eventName] === undefined){
              obj.args.events.settings['beforeOn' + eventName] = Object.assign({}, obj.args);
            }

            const newArgs = this.groupManifest[groupName].events['on' + eventName] ? this.groupManifest[groupName].events['on' + eventName](obj.args, event, anchorPoint) : {};
            Object.keys(newArgs).forEach((property)=>{
              obj.args[property] = newArgs[property];
            });
            this.context.canvas.style.cursor = obj.args.cursor || this.context.canvas.style.cursor || CURSOR.DEFAULT;


            this.groupManifest[groupName].events.settings['is' + eventName] = true;

            if(doOnEntry)
              doOnEntry(obj, 'group');
          });
        }

        //object
        this.groupManifest[groupName].objects.filter((obj)=>{
          return obj.args.events && obj.args.events['on' + eventName] && !obj.args.events.settings['is' + eventName] && entryCondition(obj);
        }).forEach((obj)=>{
          if(obj.args.events.settings['beforeOn' + eventName] === undefined){
            obj.args.events.settings['beforeOn' + eventName] = Object.assign({}, obj.args);
          }

          const newArgs = obj.args.events['on' + eventName](obj.args, event, anchorPoint);
          Object.keys(newArgs).forEach((property)=>{
            obj.args[property] = newArgs[property];
          });
          this.context.canvas.style.cursor = obj.args.cursor || this.context.canvas.style.cursor || CURSOR.DEFAULT;
          obj.args.events.settings['is' + eventName] = true;

          if(doOnEntry)
            doOnEntry(obj, 'object');
        });
      }

      //while event
      if(whileCondition){
        //group
        if(this.groupManifest[groupName].events && 
          this.groupManifest[groupName].events['on' + eventName] && 
          this.groupManifest[groupName].events.settings['is' + eventName] &&
          this.groupManifest[groupName].objects.some((obj)=> whileCondition(obj))
        ){
          this.groupManifest[groupName].objects.forEach((obj)=>{

            const newArgs = this.groupManifest[groupName].events['on' + eventName] ? this.groupManifest[groupName].events['on' + eventName](obj.args, event, anchorPoint) : {};
            Object.keys(newArgs).forEach((property)=>{
              obj.args[property] = newArgs[property];
            });
            this.context.canvas.style.cursor = obj.args.cursor || this.context.canvas.style.cursor || CURSOR.DEFAULT;

            this.groupManifest[groupName].events.settings['is' + eventName] = true;
            if(doOnwhile)
              doOnwhile(obj, 'group');
          });
        }

        //object
        this.groupManifest[groupName].objects.filter((obj)=>{
          return obj.args.events && obj.args.events['on' + eventName] && obj.args.events.settings['is' + eventName] && whileCondition(obj);
        }).forEach((obj)=>{

          const newArgs = obj.args.events['on' + eventName] ? obj.args.events['on' + eventName](obj.args, event, anchorPoint) : {};
          Object.keys(newArgs).forEach((property)=>{
            obj.args[property] = newArgs[property];
          });
          this.context.canvas.style.cursor = obj.args.cursor || this.context.canvas.style.cursor || CURSOR.DEFAULT;
          if(doOnwhile)
            doOnwhile(obj, 'object');
        });
      }



      //exit event
      if(exitCondition){
        //group
        if(
          !!this.groupManifest[groupName].events?.settings && 
          this.groupManifest[groupName].events.settings['is' + eventName] &&
          this.groupManifest[groupName].objects.every((obj)=> exitCondition(obj))
        ){
          this.groupManifest[groupName].objects.forEach((obj)=>{
            const newArgs = obj.args.events.settings['beforeOn' + eventName] || {};

            if(newArgs?.bounds){
              newArgs.bounds.x = obj.args.bounds.x;
              newArgs.bounds.y = obj.args.bounds.y;
            }

            Object.keys(newArgs).forEach((property)=>{
              obj.args[property] = newArgs[property];
            });
            this.context.canvas.style.cursor = obj.args.cursor || this.context.canvas.style.cursor || CURSOR.DEFAULT;

            this.groupManifest[groupName].events.settings['is' + eventName] = false;
            obj.args.events.settings['beforeOn' + eventName] = undefined;
            if(doOnExit)
              doOnExit(obj, 'group');
          });
        }

        
        //object
        this.groupManifest[groupName].objects.filter((obj)=>{
          return !!obj.args.events?.settings && obj.args.events.settings['is' + eventName] &&
          exitCondition(obj);
        }).forEach((obj)=>{
          const newArgs = obj.args.events.settings['beforeOn' + eventName] || {};
          if(newArgs?.bounds){
            newArgs.bounds.x = obj.args.bounds.x;
            newArgs.bounds.y = obj.args.bounds.y;
          }
          Object.keys(newArgs).forEach((property)=>{
            obj.args[property] = newArgs[property];
          });

          this.context.canvas.style.cursor = obj.args.cursor || this.context.canvas.style.cursor || CURSOR.DEFAULT;
          obj.args.events.settings['is' + eventName] = false;
          obj.args.events.settings['beforeOn' + eventName] = undefined;
          

          if(doOnExit)
            doOnExit(obj, 'object');
        });
      }
    });
  }

  ngAfterViewInit(){
    this.mouseController.lastMouseClick.pipe(skipWhile((event)=> event === null)).subscribe((event)=>{
      this.event('click', event, 
      (obj)=>{
        return this.pointWithinBounds({x: event.offsetX, y: event.offsetY}, obj.args?.bounds as Bounds);
      });
      
    });

    this.mouseController.lastMouseDown.pipe(skipWhile((event)=> event === null)).subscribe((event)=>{
      
    });


    this.mouseController.lastMouseUp.pipe(skipWhile((event)=> event === null)).subscribe((event)=>{

    });

    this.mouseController.lastMouseMove.pipe(skipWhile((event)=> event === null)).subscribe((event)=>{
      this.event('hover', event,
        (obj)=>{
          return this.pointWithinBounds({x: event.offsetX, y: event.offsetY}, obj.args?.bounds as Bounds);
        },
        undefined,
        (obj)=>{
          return !this.pointWithinBounds({x: event.offsetX, y: event.offsetY}, obj.args?.bounds as Bounds);
        }
      );
    });



    this.mouseController.dragging.pipe(
      skipWhile((event)=> event === null),
    ).subscribe((event)=>{
      const last = this.mouseController.lastMouseMove.value;
      const current = event.event;
      const diff = {x: last.offsetX - current.offsetX, y: last.offsetY - current.offsetY };

      if(event.mouseDown[1]){//middle mouse down events
        this.zoomSettings.scrollX += diff.x;
        this.zoomSettings.scrollY += diff.y;
      }
      
      this.event('drag', event.event, 
        (obj)=>{
          return event.mouseDown[0] && this.pointWithinBounds({x: event.mouseDown.anchorPoint.x, y: event.mouseDown.anchorPoint.y}, obj.args?.bounds as Bounds);
        }, 
        (obj)=>{
          return event.mouseDown[0];
        },
        (obj)=>{
          return !event.mouseDown[0];
        }, 
        (obj, debug)=>{
          this.isDragging_ = true;
        }, 
        undefined,
        (obj, debug)=>{
          this.isDragging_ = false;
        },
        event.mouseDown.anchorPoint
      );

    });

    this.cursorPosition.subscribe((cp)=>{
    });
  }

  render(){
    this.redraw();
    requestAnimationFrame( this.render.bind(this) );
  }

  redraw(){
    this.context.clearRect(0,0,this.context.canvas.width/this.zoomSettings.scale, this.context.canvas.height/this.zoomSettings.scale);
    Object.values(this.groupManifest).forEach((group)=>{
      group.objects.filter((obj)=>obj.drawFromLog).forEach((obj)=>{
        const exec = obj.func.apply(this, [this.argsScaler(obj.args)]);
      });
    });
  }

  private clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  private roundRect(x, y, width, height, radius: number = 0, fill: boolean, borderWidth: number, clip: boolean = false) {
    this.context.lineWidth = borderWidth;
    if(borderWidth > 0){
      y += this.context.lineWidth / 2;
      x += this.context.lineWidth / 2;
      height -= this.context.lineWidth;
      width -= this.context.lineWidth;
    }

    radius = this.clamp(radius, 0, 100);
    radius = (radius / 100) * (height / 2);

    let radiusSettings = {tl: 0, bl: 0, tr: 0, br: 0};

    if (typeof radius === 'number') {
      radiusSettings = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      for (let side in radiusSettings) {
        radius[side] = radius[side] || radiusSettings[side];
      }
    }
    this.context.beginPath();
    this.context.moveTo(x + radiusSettings.tl, y);
    this.context.lineTo(x + width - radiusSettings.tr, y);
    this.context.quadraticCurveTo(x + width, y, x + width, y + radiusSettings.tr);
    this.context.lineTo(x + width, y + height - radiusSettings.br);
    this.context.quadraticCurveTo(x + width, y + height, x + width - radiusSettings.br, y + height);
    this.context.lineTo(x + radiusSettings.bl, y + height);
    this.context.quadraticCurveTo(x, y + height, x, y + height - radiusSettings.bl);
    this.context.lineTo(x, y + radiusSettings.tl);
    this.context.quadraticCurveTo(x, y, x + radiusSettings.tl, y);
    if(clip){
      this.context.clip();
      this.context.clearRect(x, y, width, height);
    }
    this.context.closePath();
    if(!clip){
      if (fill) {
        this.context.fill();
      }
      if (borderWidth > 0) {
        this.context.stroke();
      }
    }
  }

  clearBounds(args: IBoundsFunc, addToLog:boolean = true, drawFromLog: boolean = true){
    this.context.fillStyle = '#ffffff00' as HexCode;
    this.context.strokeStyle = '#ffffff00' as HexCode;
    this.context.lineWidth = args.borderWidth;

    this.roundRect(args.bounds.x, args.bounds.y, args.bounds.width, args.bounds.height, args.borderRadius, false, args.borderWidth, true);
    
    if(addToLog)
      return this.addToLog(this.clearBounds, args, args.groupName, args.objectName, drawFromLog);
    return {
      func: this.clearBounds,
      args: args,
      drawFromLog: drawFromLog
    }
  }

  drawBounds(args: IBoundsFunc, addToLog:boolean = true, drawFromLog: boolean = true): ICanvasObject{
    this.context.fillStyle = args.backgroundColor;
    this.context.strokeStyle = args.borderColor;
    this.context.lineWidth = args.borderWidth;

    this.roundRect(args.bounds.x, args.bounds.y, args.bounds.width, args.bounds.height, args.borderRadius, !!args.backgroundColor, args.borderWidth, false);
    
    if(addToLog)
      return this.addToLog(this.drawBounds, args, args.groupName, args.objectName, drawFromLog);
    return {
      func: this.drawBounds,
      args: args,
      drawFromLog: drawFromLog
    }
  }

  updateExistingManifest(args: any){
    if(this.groupManifest[args.groupName]){
      this.groupManifest[args.groupName].objects.filter(obj=> obj.args.objectName === args.objectName).forEach((obj, objIndex)=>{
        const descaledArgs = this.argsDescaler(args);
        obj.args = {
          ...obj.args,
          ...descaledArgs,
          events: {
            ...descaledArgs.events,
            settings: obj.args.events.settings
          }
        };
      });
    }

  }
  drawText(args: IFillTextFunc, addToLog: boolean = true, drawFromLog: boolean = true): ICanvasObject{
    this.updateExistingManifest(args);

    this.context.fillStyle = args.color;
    this.context.font = args.fontWeight + ' ' + (args.fontSize) + 'px ' + args.fontFamily;

    const textHeight = this.getTextHeight(args.text, this.context.font);
    args.bounds.height = textHeight;
    args.bounds.width = this.getTextWidth(args.text, this.context.font);

    this.context.fillText(args.text, args.bounds.x, args.bounds.y + (textHeight), args.bounds.width);

    if(addToLog)
      return this.addToLog(this.drawText, args, args.groupName, args.objectName, drawFromLog);
    return {
      func: this.drawText,
      args: args,
      drawFromLog: drawFromLog
    }
  }

  private getTextWidth(text: string, font: string) {
    this.context.font = font;
    return this.context.measureText(text).width;
  }

  private getTextHeight(text: string, font: string) {
    this.context.font = font;
    let metrics = this.context.measureText(text);
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return fontHeight;
  }

  argsScaler(args: any){
    let copyArgs = Object.assign({}, args);
    if(copyArgs.bounds){
      let bounds: Bounds = {
        x: copyArgs.bounds.x - this.zoomSettings.scrollX,
        y: copyArgs.bounds.y - this.zoomSettings.scrollY,
        width: copyArgs.bounds.width,
        height: copyArgs.bounds.height
      };
      copyArgs.bounds = bounds;
    }
    return copyArgs;
  }

  argsDescaler(args: any){
    let copyArgs = Object.assign({}, args);
    if(copyArgs.bounds){
      let bounds: Bounds = {
        x: copyArgs.bounds.x + this.zoomSettings.scrollX,
        y: copyArgs.bounds.y + this.zoomSettings.scrollY,
        width: copyArgs.bounds.width,
        height: copyArgs.bounds.height
      };
      copyArgs.bounds = bounds;
    }
    return copyArgs;
  }

  addToLog(func: Function, args: IGroupManifestFunc<any>, groupName: string, objectName: string, drawFromLog: boolean): ICanvasObject{
    if(!this.groupManifest[groupName]){
      this.groupManifest[groupName] = {
        objects: []
      }
    }
    const objectAlreadyExists = !!this.groupManifest[groupName].objects.find(obj=>{
      return obj.args?.objectName === objectName;
    });

    //initial obj settings
    if(!objectAlreadyExists){
      if(!args.events)
        args.events = {};
      args.events.settings = this.defaultEventSettings;

      if(!this.groupManifest[groupName].events)
        this.groupManifest[groupName].events = {};
      this.groupManifest[groupName].events.settings = this.defaultEventSettings;
      this.groupManifest[groupName].objects.push({
        func: func,
        args: args,
        drawFromLog: drawFromLog
      });
      return this.groupManifest[groupName].objects[this.groupManifest[groupName].objects.length - 1];
    }
    return {
      func: func, 
      args: args,
      drawFromLog: drawFromLog
    };
  }

  onDragEvent(objArgs, event, anchorPoint){
    const beforeOnDrag: Point= {x: (objArgs.events.settings['beforeOnDrag'].bounds.x || 0), y: (objArgs.events.settings['beforeOnDrag'].bounds.y || 0)};
    const diff = {x: (anchorPoint.x / this.zoomSettings.scale) - beforeOnDrag.x, y: (anchorPoint.y / this.zoomSettings.scale) - beforeOnDrag.y};

    return {
      bounds: {x: (event.offsetX / this.zoomSettings.scale) - diff.x, y: (event.offsetY / this.zoomSettings.scale) - diff.y, width: objArgs.bounds.width, height: objArgs.bounds.height},
      cursor: CURSOR.GRABBING
    }
  }

  drawTable(table: Table, addToLog: boolean = true){
    if(this.groupManifest[table.groupName])
      this.groupManifest[table.groupName].objects = [];
    
    const BORDER_OFFSET = 0;

    const cellMaxWidths = [];
    const cellWidths = table.rows.map((row)=>{
      row.cells.map((cell, cellIndex)=>{
        const cellWidth = this.getTextWidth(cell.object.args.text, cell.object.args.fontWeight + ' ' + (cell.object.args.fontSize) + 'px ' + cell.object.args.fontFamily);
        if(cellMaxWidths[cellIndex] === undefined || cellWidth > cellMaxWidths[cellIndex]){
          cellMaxWidths[cellIndex] = cellWidth;
        }
        return cellWidth;
      });
    });

    table.rows.forEach((row)=>{
      row.cells.forEach((cell)=>{
        cell.object.args.bounds.x = table.bounds.x + (table.borderWidth) - BORDER_OFFSET;
        cell.object.args.bounds.y = table.bounds.y + (table.borderWidth) - BORDER_OFFSET;
        cell.object.args.groupName = table.groupName;
      });
    });

    let y = 0;
    let tableWidth = 0;
    const maxColumnLength = Math.max(...table.rows.map((row, rowIndex)=>{
      let x = 0;
      const rowHeight = Math.max(...row.cells.map((cell)=>{
        return this.getTextHeight(cell.object.args.text, (cell.object.args.fontSize) + 'px ' + cell.object.args.fontFamily);
      }));

      row.cells.forEach((cell, cellIndex)=>{
        cell.object.args.bounds.y += y + ((table.cellSpacing) * (rowIndex + 1));
        cell.object.args.bounds.x += x + (table.cellSpacing * (cellIndex + 1));
        x += cellMaxWidths[cellIndex];
      });

      y += rowHeight;
      if(x > tableWidth){
        tableWidth = x;
      }
      return row.cells.length;
    }));

    table.bounds.height = y + (table.cellSpacing * (table.rows.length)) + (table.borderWidth * 2) - BORDER_OFFSET;
    table.bounds.width = tableWidth + (table.cellSpacing * (maxColumnLength + 1)) + (table.borderWidth * 2) - BORDER_OFFSET;
    
    const background = this.drawBounds({
      bounds: table.bounds,
      backgroundColor: table.backgroundColor, 
      borderColor: table.borderColor, 
      borderWidth: table.borderWidth,
      borderRadius: (table.borderRadius / 100) * (100 / table.rows.length),
      groupName: table.groupName, 
      objectName: 'bounds',
      events: {
      },
      cursor: table.cursor,
    }, true, true);



    this.groupManifest[table.groupName].events = {
      ...table.events,
      settings: this.defaultEventSettings
    };
    

    table.rows.forEach((row, rowIndex)=>{
      const rowHeight = Math.max(...row.cells.map((cell, cellIndex)=>{
        return this.getTextHeight(cell.object.args.text, cell.object.args.fontWeight + ' ' + (cell.object.args.fontSize) + 'px ' + cell.object.args.fontFamily);
      }));

      /*

      const cellCenterOffset = row.cells.map((cell, cellIndex)=>{
        const cellWidth = this.getTextWidth(cell.object.args.text, cell.object.args.fontWeight + ' ' + (cell.object.args.fontSize) + 'px ' + cell.object.args.fontFamily);
        const centerText = ((cellMaxWidths[cellIndex] - cellWidth) / 2);
        return centerText;
      }).reduce((sum, current) => sum + current, 0);*/

      const rowBounds: Bounds = {
        x: row.cells[0]?.object?.args?.bounds?.x - table.cellSpacing, 
        y: row.cells[0]?.object?.args?.bounds?.y - table.cellSpacing, 
        width: table.bounds.width - (table.borderWidth * 2) + (BORDER_OFFSET * 2), 
        height: rowHeight + table.cellSpacing
      };

      const rowBackground = this.drawBounds({
        bounds: rowBounds,
        backgroundColor: rowIndex % 2? '#ffffff0d' as HexCode : '#ffffff00' as HexCode,//table.backgroundColor, 
        borderColor: '#ff0000' as HexCode, 
        borderWidth: 0,
        borderRadius: table.borderRadius / table.rows.length,
        groupName: table.groupName, 
        objectName: `${table.groupName}.rowBackground${rowIndex}`,
        cursor: table.cursor,
        events: {
          
        }
      }, true, true);
      
      row.cells.forEach((cell, cellIndex)=>{
        cell.object.args.bounds.y -= (rowBounds.height - this.getTextHeight(cell.object.args.text, (cell.object.args.fontSize) + 'px ' + cell.object.args.fontFamily)) / 2;
        cell.object.args.bounds.y -= 2;     
        const cellWidth = this.getTextWidth(cell.object.args.text, cell.object.args.fontWeight + ' ' + (cell.object.args.fontSize) + 'px ' + cell.object.args.fontFamily);
        const centerText = ((cellMaxWidths[cellIndex] - cellWidth) / 2);
        cell.object.args.bounds.x += centerText;
        
        cell.object.func.apply(this, [cell.object.args, true, true]);
      });
    });



    return this.addToLog(this.drawTable, table, table.groupName, table.objectName, false);
  }

  draw(){

    
    /*
    this.drawText({
      text: `text`,
      color: "#ffffff" as HexCode,
      fontFamily: "serif",
      fontWeight: FONTWEIGHT.BOLD,
      fontSize: 40,
      bounds: {x: 70, y: 150, width: 0, height: 0},
      groupName: 'text',
      objectName: `text`,
      cursor: CURSOR.DEFAULT,
      events: {
        onHover: (obj)=>{
          return {
            color: 'red'
          }
        }
      }
    });*/

    this.drawBounds({
        backgroundColor: COLOR.CYAN,
        bounds: { x: 50, y: 200, width: 100, height: 58 },
        groupName: 'BGTEST',
        objectName: `BGTEST`,
        borderColor: COLOR.WHITE,
        borderRadius: 100,
        borderWidth: 2,
        cursor: CURSOR.DEFAULT,
        events: {
          onDrag: this.onDragEvent.bind(this),
          onHover: (obj)=>{
            return {
              borderColor: COLOR.RED,
              cursor: CURSOR.GRAB,
            }
          }
        }
    }, true, true);

    
    
    this.drawTable({
      objectName: 'test',
      groupName: 'test',
      borderWidth: 3,
      borderColor: '#575b68' as HexCode,
      backgroundColor: '#24262d' as HexCode,
      bounds: {x: 50, y: 0, width: 200, height: 100},
      cellSpacing: 10,
      cursor: CURSOR.DEFAULT,
      rows: [1,2,3].map((rowVal, rowKey)=>{
        return {
          cells:[1,2,3].map((cellVal, cellKey)=>{
            return {
              object: {
                func: this.drawText,
                args: {
                  text: `row${rowKey}.cell${cellKey}`,
                  color: '#d3d6da' as HexCode,
                  fontFamily: "sans-serif",
                  fontWeight: FONTWEIGHT.BOLD,
                  fontSize: 11,
                  bounds: {x: 0, y: 0, width: 0, height: 0},
                  groupName: 'test',
                  objectName: `row${rowKey}.cell${cellKey}`,
                  cursor: CURSOR.GRAB,
                  events: {
                    onHover: (obj)=>{
                      return {
                        color: COLOR.RED,
                        cursor: CURSOR.POINTER
                      }
                    }
                  }
                },
                drawFromLog: false
              },
              events: {
                
              }
            }
          })
        };
      }),
      events: {
        onDrag: this.onDragEvent.bind(this),
        onHover: (obj)=>{
          return {
            borderColor: COLOR.RED,
            backgroundColor: 'blue',
            cursor: CURSOR.GRAB
          }
        }
      }
    });
  }

  setCanvasDimensions(width: number, height: number){
    this.width = width;
    this.height = height;
    this.canvas.setAttribute('width', width.toString());
    this.canvas.setAttribute('height', height.toString());
  }

  onZoom(e: WheelEvent){
    let previousScale= this.zoomSettings.scale;
  
    // calculate scale direction 6 new scale value
    let direction = e.deltaY > 0 ? 1 : -1;
    const scale = this.zoomSettings.scale + this.zoomSettings.scaleFactor * direction;
    if(scale >= 0){
      this.zoomSettings.scale = scale;
      // calculate the new scroll values
      this.zoomSettings.scrollX += ( (this.width / 2) / previousScale )  - ( (this.width / 2)  / this.zoomSettings.scale);
      this.zoomSettings.scrollY += ( (this.height / 2) / previousScale ) - ( (this.height / 2) / this.zoomSettings.scale);
      
      // apply new scale in a non acumulative way
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.scale(this.zoomSettings.scale, this.zoomSettings.scale);

      this.redraw();

    }
  }

  pointWithinBounds(point: Point, bounds_: Bounds){
    let bounds = Object.assign({}, bounds_);
    bounds.x -= this.zoomSettings.scrollX;
    bounds.y -= this.zoomSettings.scrollY;
    point.x /= this.zoomSettings.scale;
    point.y /= this.zoomSettings.scale;
    const withinHorizontal = point.x >= bounds.x && point.x <= (bounds.x + bounds.width);
    const withinVertical = point.y >= bounds.y && point.y <= (bounds.y + bounds.height);

    return withinHorizontal && withinVertical;
  }
}
