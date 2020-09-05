import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PrintersComponent } from "./printers.component";

import { PrinterprofileComponent } from "./printerprofile/printerprofile.component";
import { PrintersGuard } from "./auth/printers.guard";
import { AllOrdersComponent } from "./all-orders/all-orders.component"
import { NotificationsComponent } from './notifications/notifications.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { OnGoingOrderComponent } from "./on-going-order/on-going-order.component"


const routes: Routes = [
  {
    path: "",
    component: PrintersComponent,
    canActivate: [PrintersGuard],
    children: [
      {
        path: "profile",
        component: PrinterprofileComponent
      },
      {
        path: "notifications",
        component: NotificationsComponent
      },
      {
        path: "deliverydetails",
        component: DeliveryDetailsComponent
      },
      {
        path: "allorders",
        component:AllOrdersComponent
      },
      {
        path: "activeorders",
      component:OnGoingOrderComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintersRoutingModule {}
