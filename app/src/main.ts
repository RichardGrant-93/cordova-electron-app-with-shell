import { ApplicationRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { app, BrowserWindow, Menu } from 'electron';
import { enableDebugTools } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));