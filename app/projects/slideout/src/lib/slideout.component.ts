import { AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MaterialIcon } from '@library/vertical-navigation/src/lib/models/materialIcon.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-slideout',
  templateUrl: './slideout.component.html',
  styleUrls: ['./slideout.component.scss']
})
export class SlideoutComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {

  @ContentChild('slideout') slideout: TemplateRef<any>;
  @ContentChild('body') body: TemplateRef<any>;

  @ViewChild('slideoutButton') slideoutButton: MatButton;
  @ViewChild('slideoutSlideoutWrapper') slideoutSlideoutWrapper: ElementRef<HTMLDivElement>;


  public hasAnimationFinished = false;
  @HostListener('oanimationend', ['$event.target'])
  @HostListener('animationend', ['$event.target'])
  @HostListener('webkitAnimationEnd', ['$event.target'])
  onAnimationFinished(){
    this.hasAnimationFinished = true;
  }

  public preventPointerEvents: BehaviorSubject<boolean> = new BehaviorSubject(false);

  readonly bumperIcon = MaterialIcon.chevron_left;

  private forceClose_ = false;
  private isSlideoutOpen_ = true;
  get isSlideoutOpen(){
    if(this.forceClose_)
      return false;
    return this.isSlideoutOpen_;
  }
  set isSlideoutOpen(val){
    if(this.isSlideoutOpen_  !== val && !this.forceClose_){
      this.hasAnimationFinished = false;
      this.isSlideoutOpen_ = val; 
    }
  }

  get slideoutButtonWidth(){
    return this.slideoutButton?._elementRef?.nativeElement?.offsetWidth || 0;
  }

  get slideoutWidth(){
    return this.slideoutSlideoutWrapper?.nativeElement?.offsetWidth || 0;
  }
  
  constructor() { }
  ngDoCheck(): void {
    if(this.slideoutSlideoutWrapper?.nativeElement?.offsetWidth)
      document.documentElement.style.setProperty('--slideoutWidth', this.slideoutWidth + 'px');
  }
  ngAfterViewChecked(): void {
    if(this.slideoutSlideoutWrapper?.nativeElement?.offsetWidth)
      document.documentElement.style.setProperty('--slideoutWidth', this.slideoutWidth + 'px');
  }
  ngAfterViewInit(): void {  
    document.documentElement.style.setProperty('--slideoutWidth', this.slideoutWidth + 'px');
  }

  ngOnInit(): void {
  }

  slideoutToggle(){
    this.isSlideoutOpen_ = !this.isSlideoutOpen_;
    if(!this.isSlideoutOpen_){
      this.forceClose_ = true;
    }else{
      this.forceClose_ = false;
    }
  }

}
