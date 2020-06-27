import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PrintersComponent } from "./printers.component";

import { PrinterprofileComponent } from "./printerprofile/printerprofile.component";
import { PrintersGuard } from "./auth/printers.guard";

const routes: Routes = [
  {
    path: "",
    component: PrintersComponent,
    canActivate: [PrintersGuard],
    children: [
      {
        path: "profile",
        component: PrinterprofileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintersRoutingModule {}
