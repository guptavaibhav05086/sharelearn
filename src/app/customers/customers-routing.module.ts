import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomersComponent } from "./customers.component";
import { OngoingOrdersComponent } from "./ongoing-orders/ongoing-orders.component";
import { AllOrdersComponent } from "./all-orders/all-orders.component";
const routes: Routes = [
  {
    path: "",
    component: CustomersComponent,
    children: [
      { path: "ongoingorder", component: OngoingOrdersComponent },
      { path: "allorder", component: AllOrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
