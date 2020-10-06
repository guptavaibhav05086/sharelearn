import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridModule } from "ag-grid-angular";
import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomersComponent } from "./customers.component";
import { OngoingOrdersComponent } from "./ongoing-orders/ongoing-orders.component";
import { AllOrdersComponent } from "./all-orders/all-orders.component";
import { ActiveOrdersComponent } from "./active-orders/active-orders.component";
import { ButtonrendererComponent } from "./buttonrenderer/buttonrenderer.component";

@NgModule({
  declarations: [
    CustomersComponent,
    OngoingOrdersComponent,
    AllOrdersComponent,
    ActiveOrdersComponent,
    ButtonrendererComponent
  ],
  imports: [CommonModule, CustomersRoutingModule, AgGridModule]
})
export class CustomersModule {}
