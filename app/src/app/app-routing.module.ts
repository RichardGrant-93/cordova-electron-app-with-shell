import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableSearchModule } from './table-search/table-search.module';

const routes: Routes = [
    {
      path: 'search',
      children: [
        {
            path: 'table',
            loadChildren: () => import('./table-search/table-search.module').then(m => m.TableSearchModule)
        }   
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}