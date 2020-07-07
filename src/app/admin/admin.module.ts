import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { LeftnavComponent } from "./leftnav/leftnav.component";
import { TopnavComponent } from "./topnav/topnav.component";
import { NavbarcommonComponent } from "./navbarcommon/navbarcommon.component";
import { ProductsComponent } from './products/products.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonrendererComponent } from './buttonrenderer/buttonrenderer.component';
@NgModule({
  declarations: [
    AdminComponent,
    LeftnavComponent,
    TopnavComponent,
    NavbarcommonComponent,
    ProductsComponent,
    ButtonrendererComponent
  ],
  imports: [CommonModule, AdminRoutingModule,AgGridModule]
})
export class AdminModule {}
