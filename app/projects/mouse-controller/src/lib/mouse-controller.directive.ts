import { Directive, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Point } from '@angular/cdk/drag-drop';

export enum CURSOR {
  AUTO = 'auto',
  DEFAULT = 'default',
  NONE = 'none',
  CONTEXT_MENU = 'context-menu',
  HELP = 'help',
  POINTER = 'pointer',
  WAIT = 'wait',
  PROGRESS = 'progress',
  CELL = 'cell',
  CROSSHAIR = 'crosshair',
  TEXT = 'text',
  VERTICAL_TEXT = 'vertical-text',
  ALIAS = 'alias',
  COPY = 'copy',
  NO_DROP = 'no-drop',
  NOT_ALLOWED = 'not-allowed',
  GRAB = 'grab',
  GRABBING = 'grabbing',
  ALL_SCROLL = 'all-scroll',
  MOVE = 'move',
  COL_RESIZE = 'col-resize',
  ROW_RESIZE = 'row-resize',
  N_RESIZE = 'n-resize',
  E_RESIZE = 'e-resize',
  S_RESIZE = 's-resize',
  W_RESIZE = 'w-resize',
  NE_RESIZE = 'ne-resize',
  NW_RESIZE = 'nw-resize',
  SE_RESIZE = 'se-resize',
  SW_RESIZE = 'sw-resize',
  EW_RESIZE = 'ew-resize',
  NS_RESIZE = 'ns-resize',
  NESW_RESIZE = 'nesw-resize',
  NWSE_RESIZE = 'nwse-resize',
  ZOOM_IN = 'zoom-in',
  ZOOM_OUT = 'zoom-out'
};

enum MouseButton{
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2
}

@Directive({
  selector: '[mouse-controller]',
})
export class MouseControllerDirective{
  readonly lastMouseMove: BehaviorSubject<MouseEvent> = new BehaviorSubject({offsetX: 0, offsetY: 0} as MouseEvent);
  readonly lastMouseClick: BehaviorSubject<MouseEvent> = new BehaviorSubject(null);
  readonly lastMouseDown: BehaviorSubject<MouseEvent> = new BehaviorSubject(null);
  readonly lastMouseUp: BehaviorSubject<MouseEvent> = new BehaviorSubject(null);
  readonly dragging: BehaviorSubject<{mouseDown: {
    [MouseButton.LEFT]: boolean,
    [MouseButton.MIDDLE]: boolean,
    [MouseButton.RIGHT]: boolean,
    anchorPoint: Point
  }, event: MouseEvent}> = new BehaviorSubject(null);


  public mouseDown = {
    [MouseButton.LEFT]: false,
    [MouseButton.MIDDLE]: false,
    [MouseButton.RIGHT]: false,
    anchorPoint: {x: 0, y: 0}
  };

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if(event){
      this.lastMouseMove.next(event);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if(event){
      if(Object.values(this.mouseDown).includes(true))
        this.dragging.next({mouseDown: this.mouseDown, event: event});

      this.lastMouseMove.next(event);
    }
  }

  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
    this.lastMouseClick.next(event);
  }

  @HostListener('window:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if(Object.values(MouseButton).includes(event.button)){
      this.mouseDown.anchorPoint = {x: event.offsetX, y: event.offsetY};
      if(event.button === MouseButton.LEFT){
        this.mouseDown[MouseButton.LEFT] = true;
      }
      if(event.button === MouseButton.MIDDLE){
        this.mouseDown[MouseButton.MIDDLE] = true;
      }
      if(event.button === MouseButton.RIGHT){
        this.mouseDown[MouseButton.RIGHT] = true;
      }
    }
    
    this.lastMouseDown.next(event);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if(Object.values(MouseButton).includes(event.button)){
      const aButtonWasPressedBeforeRelease = !!Object.values(this.mouseDown).find(isPressed=>isPressed === true);

      this.mouseDown.anchorPoint = {x: event.offsetX, y: event.offsetY};
      if(event.button === MouseButton.LEFT){
        this.mouseDown[MouseButton.LEFT] = false;
      }
      if(event.button === MouseButton.MIDDLE){
        this.mouseDown[MouseButton.MIDDLE] = false;
      }
      if(event.button === MouseButton.RIGHT){
        this.mouseDown[MouseButton.RIGHT] = false;
      }
      this.dragging.next({mouseDown: this.mouseDown, event: event});
    }
    this.lastMouseUp.next(event);
  }
}