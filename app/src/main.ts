import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


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