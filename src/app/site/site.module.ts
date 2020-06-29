import { NgModule } from '@angular/core';

import { SiteRoutingModule } from './site-routing.module';
import { SiteFaceComponent } from './site-face/site-face.component';
import {SharedModule} from "../shared/shared.module";
import { SiteLayoutComponent } from './site-layout/site-layout.component';


@NgModule({
  declarations: [SiteFaceComponent, SiteLayoutComponent],
  imports: [
    SharedModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
