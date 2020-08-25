import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PrintersComponent } from "./printers.component";

import { PrinterprofileComponent } from "./printerprofile/printerprofile.component";
import { PrintersGuard } from "./auth/printers.guard";

import { NotificationsComponent } from './notifications/notifications.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintersRoutingModule {}
