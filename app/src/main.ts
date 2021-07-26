import { ApplicationRef, APP_BOOTSTRAP_LISTENER, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { app, BrowserWindow, Menu } from 'electron';
import { enableDebugTools } from '@angular/platform-browser';


if (environment.production) {
  enableProdMode();
}


const bootstrap = () =>{
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
}
if(typeof window['cordova'] !== 'undefined'){
  console.log("cordova window");
  document.addEventListener('deviceready', ()=>{
    bootstrap();
    console.log("boot 1");
  });
}else{
  bootstrap();
  console.log("boot 2");
}