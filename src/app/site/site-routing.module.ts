import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SiteLayoutComponent} from "./site-layout/site-layout.component";
import {SiteFaceComponent} from "./site-face/site-face.component";
import {AuthGuard} from "../shared/classes/auth.guard";


const routes: Routes = [
  {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'site-face', component: SiteFaceComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
