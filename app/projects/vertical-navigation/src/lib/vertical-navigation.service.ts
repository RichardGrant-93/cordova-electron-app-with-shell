import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerticalNavigationService {
  public isMini$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
}
