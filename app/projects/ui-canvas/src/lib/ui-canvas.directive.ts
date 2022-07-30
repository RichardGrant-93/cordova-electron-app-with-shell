import { AfterViewInit, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { Point } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Bounds, HexCode } from './ui-canvas.models';
import { skipWhile } from 'rxjs/operators';
import { CURSOR, MouseControllerDirective } from '@library/mouse-controller/src/lib/mouse-controller.directive';
import { COLOR } from './ui-canvas.models';
import { X } from '@angular/cdk/keycodes';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { KebabMenu } from '@library/kebab-menu/src/projects';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { KebabActions } from '@app/table-search/component-store/table-search.models';
import { ActionEmit } from '@library/form/src/lib/models/actionEmit.model';
import { NavLink } from '@library/menu/src/lib/nav-link/models/navLink.model';

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

export enum FontFamily {
  Serif = 'Serif',
  Sans_Serif = 'sans-serif',
  Material_Icons = 'Material Icons',
};

interface IManifestEvent<T>{
  onHover?: (objArgs: T, event: MouseEvent, anchorPoint: Point)=> {};
  onClick?: (objArgs: T, event: MouseEvent, anchorPoint: Point)=> {};
  onMouseDown?: (objArgs: T, event: MouseEvent, anchorPoint: Point)=> {};
  onDrag?: (objArgs: T, event: MouseEvent, anchorPoint: Point)=> {};
  onRedraw?: (objArgs: T)=> {};
  settings?: {
    isHover: boolean,
    beforeOnHover?: any,
    isClick: boolean,
    beforeOnClick?: any
    isDrag: boolean,
    beforeOnDrag?: any
    beforeOnMouseDown?: any;
    isMouseDown: boolean;
  }
};

interface IGroupManifestFunc<T>{
  groupName: string, 
  objectName: string,
  events?: IManifestEvent<T>,
  cursor?: CURSOR,
};

interface IPathArgs extends IGroupManifestFunc<IPathArgs>{
  strokeWidth?: number,
  strokeColor?: COLOR | HexCode,
  selector1: string;
  selector2: string;
  lineDash?: number[];
}

interface IBoundsArgs extends IGroupManifestFunc<IBoundsArgs>{
  bounds: Bounds,
  backgroundColor?: COLOR | HexCode,
  borderColor?: COLOR | HexCode,
  borderRadius?: number,
  borderWidth?: number,
  clip?: IBoundsArgs
};

export interface IKebabArgs extends IFillTextArgs{
  options: NavLink[]
}

interface IText {
  text?: string;
  color?: COLOR | HexCode;
  fontFamily?: FontFamily;
  fontWeight?: FONTWEIGHT;
  fontSize?: number;
  maxWidth?: number;
}

interface IFillTextArgs extends IGroupManifestFunc<IFillTextArgs>{
  text: IText;
  bounds?: Bounds;
}

export interface ICanvasObject<T>{//T is an interface that extends the IGroupManifestFunc
  func: Function,
  args: T,
  drawFromLog: boolean,
};

interface IGroupManifest{
  [key: string]: {
    objects: ICanvasObject<any>[],
    events?: IManifestEvent<any>
  }
}

export interface ITableArgs extends IGroupManifestFunc<ITableArgs>{
  titlePrefix?: IText,
  title: IText,
  bounds: Bounds;
  cellSpacing: number;
  borderWidth: number;
  borderColor?: COLOR | HexCode;
  backgroundColor?: COLOR | HexCode;
  borderRadius?: number;
  warning?: IText;
  kebabMenu?: ()=> {
    object: ICanvasObject<IFillTextArgs>,
    events: IManifestEvent<any>
  },
  rows: {
    cells: {
      object: ICanvasObject<IFillTextArgs>,
      events: IManifestEvent<any>
    }[]
  }[]
}

export interface UICanvasKebabActionEmit{
  openAt: Point,
  groupName: string,
  objectName: string,
  options: NavLink[]
};

@Directive({
  selector: 'canvas[ui-canvas]',
})
export class UiCanvasDirective implements AfterViewInit{

  @Output() kebabAction: EventEmitter<UICanvasKebabActionEmit> = new EventEmitter();
  
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

  get isDragging(){
    return this.isDragging_;
  }

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
      isMouseDown: false,
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

  get contextMenus(){
    return [...Object.keys(this.groupManifest).map((groupName)=>{
      return this.groupManifest[groupName].objects.filter((obj)=> obj.args.objectName.includes('kebab') );
    }).reduce((accumulator, value) => accumulator.concat(value), [])];
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
    entryCondition?: <T>(obj: ICanvasObject<T>)=> boolean, 
    whileCondition?: <T>(obj: ICanvasObject<T>)=> boolean, 
    exitCondition?: <T>(obj: ICanvasObject<T>)=> boolean, 
    doOnEntry?: <T>(obj: ICanvasObject<T>, debug: string) => void, 
    doOnwhile?:  <T>(obj: ICanvasObject<T>, debug: string) => void, 
    doOnExit?:  <T>(obj: ICanvasObject<T>, debug: string) => void, 
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
          this.groupManifest[groupName].objects.forEach((obj: ICanvasObject<IFillTextArgs>)=>{
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
      (obj: ICanvasObject<any>)=>{
        return this.pointWithinBounds({x: event.offsetX, y: event.offsetY}, obj.args?.bounds as Bounds);
      },
      ()=>{
        return false;
      },
      ()=>{
        return true;
      }
    );
      
    });

    this.mouseController.lastMouseDown.pipe(skipWhile((event)=> event === null)).subscribe((event)=>{
      
      this.event('mouseDown', event, 
      (obj: ICanvasObject<any>)=>{
        return this.pointWithinBounds({x: event.offsetX, y: event.offsetY}, obj.args?.bounds as Bounds);
      },
      undefined,
      ()=>{
        return true;
      });
    });


    this.mouseController.lastMouseUp.pipe(skipWhile((event)=> event === null)).subscribe((event)=>{

    });

    
    this.mouseController.lastMouseMove.pipe(skipWhile((event)=> event === null)).subscribe((event)=>{
      this.event('hover', event,
        (obj: ICanvasObject<any>)=>{
          return this.pointWithinBounds({x: event.offsetX, y: event.offsetY}, obj.args?.bounds as Bounds);
        },
        undefined,
        (obj: ICanvasObject<any>)=>{
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
        (obj: ICanvasObject<any>)=>{
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

    const groups = Object.assign({}, this.groupManifest);

    if(this.groupManifest['constraints']){
      delete groups['constraints'];

      this.groupManifest['constraints'].objects.filter((obj)=>obj.drawFromLog).forEach((obj)=>{
        const exec = obj.func.apply(this, [this.argsScaler(obj.args)]);
      });
    }

    Object.values(groups).forEach((group)=>{
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

  clearBounds(args: IBoundsArgs, addToLog:boolean = true, drawFromLog: boolean = true){
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

  drawBounds(args: IBoundsArgs, addToLog:boolean = true, drawFromLog: boolean = true): ICanvasObject<IBoundsArgs>{
    this.context.fillStyle = args.backgroundColor;
    this.context.strokeStyle = args.borderColor;
    this.context.lineWidth = args.borderWidth;
    this.context.setLineDash([]);

    this.roundRect(args.bounds.x, args.bounds.y, args.bounds.width, args.bounds.height, args.borderRadius, !!args.backgroundColor, args.borderWidth, false);
    
    if(addToLog)
      return this.addToLog(this.drawBounds, args, args.groupName, args.objectName, drawFromLog);
    return {
      func: this.drawBounds,
      args: args,
      drawFromLog: drawFromLog
    }
  }

  drawPath(args: IPathArgs, addToLog:boolean = true, drawFromLog: boolean = true): ICanvasObject<IPathArgs>{
    const selector1 = args.selector1.split('.');
    const selector2 = args.selector2.split('.');
    const obj1 = this.argsScaler(this.objectSelector(selector1[0], selector1[1])?.args);
    const obj2 = this.argsScaler(this.objectSelector(selector2[0], selector2[1])?.args);

    if(!obj1 || !obj2)
      return;

    if(Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0)
      return;

    const startCenterX = obj1.bounds.x + (obj1.bounds.width / 2);

    const obj1_is_left = obj1.bounds.x + obj1.bounds.width < obj2.bounds.x;
    const obj1_is_right = obj1.bounds.x > obj2.bounds.x + obj2.bounds.width;

    const obj1_is_top = obj1.bounds.y + obj1.bounds.height < obj2.bounds.y;
    const obj1_is_bottom = obj1.bounds.y > obj2.bounds.y + obj2.bounds.height;

    let offsetX = (obj2.bounds.x + (obj2.bounds.width / 2));
    let offsetY = obj1.bounds.y - (obj2.bounds.y - obj2.bounds.height);

    const startPoint = {x: startCenterX, y: obj1.bounds.y};
    if(obj1_is_top){
      startPoint.y = obj1.bounds.y + obj1.bounds.height;
      offsetY = obj1.bounds.y - (obj2.bounds.y - obj2.bounds.height);
    }else if(obj1_is_bottom){
      startPoint.y = obj1.bounds.y;
      offsetY = (obj1.bounds.y - obj1.bounds.height) - obj2.bounds.y;
    }else{
      startPoint.y = obj1.bounds.y;
      offsetY = obj1.bounds.y - (obj2.bounds.y);

  
      offsetY += 100;
    }

    const endPoint = {x: offsetX, y: obj2.bounds.y};
    if(obj1_is_bottom){
      endPoint.y = obj2.bounds.y + obj2.bounds.height;
    }


    const path: Point[] = [
      {x: startPoint.x, y: startPoint.y },
      {x: startPoint.x, y: startPoint.y - (offsetY / 2)},
      {x: offsetX, y: startPoint.y - (offsetY / 2)},
      {x: endPoint.x, y: endPoint.y},
    ];

    this.context.beginPath();
    if(args.lineDash){
      this.context.setLineDash(args.lineDash);
    }
    this.context.strokeStyle = args.strokeColor;
    this.context.lineWidth = args.strokeWidth;
    this.context.moveTo(path[0].x, path[0].y);
    path.slice(1).forEach((point)=>{
      this.context.lineTo(point.x, point.y);
    });
    this.context.stroke();
    this.context.closePath();
    
    if(addToLog)
      return this.addToLog(this.drawPath, args, args.groupName, args.objectName, drawFromLog);
    return {
      func: this.drawPath,
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

  drawText(args: IFillTextArgs, addToLog: boolean = true, drawFromLog: boolean = true): ICanvasObject<IFillTextArgs>{
    this.updateExistingManifest(args);

    this.context.fillStyle = args.text.color;
    this.context.font = args.text.fontWeight + ' ' + (args.text.fontSize) + 'px ' + args.text.fontFamily;

    const textHeight = this.getTextHeight(args.text.text, this.context.font);

    args.bounds.height = textHeight;
    args.bounds.width = this.getTextWidth(args.text.text, this.context.font);

    const wasText = '...';
    const was = args.bounds.width > args.text.maxWidth;
    const wasWidth = was? this.getTextWidth(wasText, this.context.font) : 0;
    if(args.text.maxWidth && (args.text.maxWidth > args.text.fontSize) && (args.bounds.width > args.text.maxWidth - wasWidth)){
      while(args.bounds.width > args.text.maxWidth - wasWidth){
        args.text.text = args.text.text.slice(0, -1);
        args.bounds.width = this.getTextWidth(args.text.text, this.context.font);
      }
      if(was){
        args.text.text += wasText;
      }
    }


    this.context.fillText(args.text.text, args.bounds.x, args.bounds.y + (textHeight), args.bounds.width);

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
    let metrics = this.context.measureText(text);
    return metrics.width;
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

  /*args should be any type that extends IGroupManifestFunc<T>*/
  addToLog<T>(func: Function, args: any | IGroupManifestFunc<T>, groupName: string, objectName: string, drawFromLog: boolean): ICanvasObject<T>{ //the T is an interface that extends IGroupManifestFunc
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
    } as ICanvasObject<T>;
  }

  onDragEvent(objArgs, event, anchorPoint){
    const beforeOnDrag: Point= {x: (objArgs.events.settings['beforeOnDrag'].bounds.x || 0), y: (objArgs.events.settings['beforeOnDrag'].bounds.y || 0)};
    const diff = {x: (anchorPoint.x / this.zoomSettings.scale) - beforeOnDrag.x, y: (anchorPoint.y / this.zoomSettings.scale) - beforeOnDrag.y};

    return {
      bounds: {x: (event.offsetX / this.zoomSettings.scale) - diff.x, y: (event.offsetY / this.zoomSettings.scale) - diff.y, width: objArgs.bounds.width, height: objArgs.bounds.height},
      cursor: CURSOR.GRABBING
    }
  }

  getGroupManifestBySelector(groupName: string){
    return this.groupManifest[groupName];
  }

  objectSelector(groupName: string, objectName: string){
    if(this.groupManifest[groupName])
      return this.groupManifest[groupName].objects.find(obj=>{
        return obj.args.objectName === objectName;
      });
  }

  drawLink(selector1_: string, selector2_: string, color: COLOR | HexCode){
    this.drawPath({
      strokeColor: color,
      strokeWidth: 1,
      selector1: selector1_,
      selector2: selector2_,
      groupName: 'constraints',
      objectName: selector1_ + ':' + selector2_,
      lineDash: [8, 8]
    }, true, true);
  }

  clearLinks(){
    delete this.groupManifest['constraints'];
  }

  drawTable(table: ITableArgs){
    if(this.groupManifest[table.groupName])
      this.groupManifest[table.groupName].objects = [];
    if(table.kebabMenu){
      table.rows.forEach((row, rowIndex)=>{
        const kebab = table.kebabMenu();
        if(rowIndex === 0)
          kebab.object.args.text.text = '';
        kebab.object.args.objectName = `${table.groupName}-kebab-${rowIndex}`;
        kebab.object.args.events['onClick'] = (objArgs: any, event: PointerEvent)=>{
          this.kebabAction.emit({
            openAt: {x: event.offsetX - 50, y: event.offsetY + table.cellSpacing} as Point,
            groupName: objArgs.groupName,
            objectName: objArgs.objectName,
            options: objArgs.options
          });

          return {}
        };
        return row.cells.push(kebab);
      });
    }
      
    const BORDER_OFFSET = 0;

    const cellMaxWidths = [];
    const cellWidths = table.rows.map((row)=>{
      row.cells.map((cell, cellIndex)=>{
        const cellWidth = this.getTextWidth(cell.object.args.text.text, cell.object.args.text.fontWeight + ' ' + (cell.object.args.text.fontSize) + 'px ' + cell.object.args.text.fontFamily);
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
        return this.getTextHeight(cell.object.args.text.text, (cell.object.args.text.fontSize) + 'px ' + cell.object.args.text.fontFamily);
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
      borderRadius: table.rows.length === 0 && !!table.warning?.text? (table.borderRadius / 100) * (100 / 2): ((table.borderRadius / 100) * (100 / table.rows.length)),
      groupName: table.groupName, 
      objectName: 'bounds',
      events: {
      },
      cursor: table.cursor,
    }, true, true);
    

    table.rows.forEach((row, rowIndex)=>{
      const rowHeight = Math.max(...row.cells.map((cell, cellIndex)=>{
        return this.getTextHeight(cell.object.args.text.text, cell.object.args.text.fontWeight + ' ' + (cell.object.args.text.fontSize) + 'px ' + cell.object.args.text.fontFamily);
      }));

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
        cell.object.args.bounds.y -= (rowBounds.height - this.getTextHeight(cell.object.args.text.text, (cell.object.args.text.fontSize) + 'px ' + cell.object.args.text.fontFamily)) / 2;
        cell.object.args.bounds.y -= 2;     
        const cellWidth = this.getTextWidth(cell.object.args.text.text, cell.object.args.text.fontWeight + ' ' + (cell.object.args.text.fontSize) + 'px ' + cell.object.args.text.fontFamily);
        const centerText = ((cellMaxWidths[cellIndex] - cellWidth) / 2);
        cell.object.args.bounds.x += centerText;
        
        cell.object.func.apply(this, [cell.object.args, true, true]);
      });
    });


    if(table.warning?.text){
      const tableWarningHeight = this.getTextHeight(table.warning.text, table.warning.fontWeight + ' ' + (table.warning.fontSize) + 'px ' + table.warning.fontFamily) + (table.cellSpacing / 2);
      const tableWarningWidth = this.getTextWidth(table.warning.text, table.warning.fontWeight + ' ' + (table.warning.fontSize) + 'px ' + table.warning.fontFamily);
      const tableWidth = tableWarningWidth
        + (table.cellSpacing / 2)
        + 50;
      table.bounds.height += (tableWarningHeight * 2);
      if(table.bounds.width <= tableWidth)
        table.bounds.width = tableWidth;

      this.drawText({
        text: {
          ...table.warning,
          maxWidth: table.bounds.width - (table.cellSpacing / 2),
        },
        objectName: table.objectName + '-warning',
        groupName: table.groupName,
        bounds: {...table.bounds, x: table.bounds.x + ((table.bounds.width / 2) - (tableWarningWidth / 2)), y: (table.bounds.y + (tableWarningHeight / 2))}
      }, true, true);
    }

    const titlePrefixSpacing = 5;
    let tableTitlePrefixWidth = this.getTextWidth('i', table.titlePrefix.fontWeight + ' ' + (table.titlePrefix.fontSize) + 'px ' + table.titlePrefix.fontFamily);
    if(table.titlePrefix?.text){
      const tableTitlePrefixHeight = this.getTextHeight(table.titlePrefix.text, table.titlePrefix.fontWeight + ' ' + (table.titlePrefix.fontSize) + 'px ' + table.titlePrefix.fontFamily)
      this.drawText({
        text: {
          ...table.titlePrefix,
          color: table.borderColor
        },
        objectName: table.objectName + '-title-prefix',
        groupName: table.groupName,
        bounds: {x: table.bounds.x + (table.cellSpacing / 2), y: table.bounds.y - tableTitlePrefixHeight - 4, width: 0, height: 0}
      }, true, true);
    }

    const tableTitleHeight = this.getTextHeight(table.title.text, table.title.fontWeight + ' ' + (table.title.fontSize) + 'px ' + table.title.fontFamily)
    this.drawText({
      text: {
        ...table.title,
        maxWidth: table.bounds.width - (table.cellSpacing / 2) - tableTitlePrefixWidth - titlePrefixSpacing
      },
      objectName: table.objectName + '-title',
      groupName: table.groupName,
      bounds: {x: table.bounds.x + (table.cellSpacing / 2) + tableTitlePrefixWidth + titlePrefixSpacing, y: table.bounds.y - tableTitleHeight - 5, width: 0, height: 0},
    }, true, true);

    
    this.groupManifest[table.groupName].events = {
      ...table.events,
      onClick: (objArgs, event, anchorPoint)=> {
        if(table.events?.onClick)
          return table.events.onClick(objArgs, event, anchorPoint);
        return {};
      },
      onHover: (objArgs, event, anchorPoint)=> {
        if(table.events?.onHover)
          return table.events.onHover(objArgs, event, anchorPoint);
        return {};
      },
      onDrag: (objArgs, event, anchorPoint)=> {
        if(table.events?.onDrag)
          return table.events.onDrag(objArgs, event, anchorPoint);
        return {};
      },
      onMouseDown: (objArgs, event, anchorPoint)=> {
        if(table.events?.onMouseDown)
          return table.events.onMouseDown(objArgs, event, anchorPoint);
        return {};
      },
      settings: this.defaultEventSettings
    };




    return this.addToLog(this.drawTable, table, table.groupName, table.objectName, false);
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

  get centerPoint(): Point{
    return {
      x: this.zoomSettings.scrollX + ((this.width / this.zoomSettings.scale) / 2),
      y: this.zoomSettings.scrollY + ((this.height / this.zoomSettings.scale) / 2)
    }
  }
}
