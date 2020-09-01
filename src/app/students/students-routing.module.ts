import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudentsComponent } from "./students.component";
import { DashboadComponent } from "./dashboad/dashboad.component";
import { CoursetakenComponent } from "./coursetaken/coursetaken.component";
import { StudentprofileComponent } from "./studentprofile/studentprofile.component";
import { StudentGuard } from "./authGuard/student.guard";
import { PaymentsComponent } from "./payments/payments.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SettingsComponent } from "./settings/settings.component";
import { HelpComponent } from "./help/help.component";
import { DesignerprofileComponent } from "./designerprofile/designerprofile.component";
import { OnGoingOrderComponent } from "./on-going-order/on-going-order.component";
import { AllOrdersComponent } from "./all-orders/all-orders.component";
import { PaymentDetailsComponent } from "./payment-details/payment-details.component";
const routes: Routes = [
  {
    path: "",
    component: StudentsComponent,
    canActivate: [StudentGuard],
    children: [
      { path: "dashboard", component: DashboadComponent },
      { path: "orders", component: CoursetakenComponent },
      { path: "courses", component: CoursetakenComponent },
      { path: "profile", component: StudentprofileComponent },

      { path: "payments", component: PaymentsComponent },
      { path: "notifications", component: NotificationsComponent },
      { path: "settings", component: SettingsComponent },
      { path: "designerprofile", component: DesignerprofileComponent },
      { path: "help", component: HelpComponent },
      { path: "activeorder", component: OnGoingOrderComponent },
      { path: "allOrders", component: AllOrdersComponent },
      { path: "paymentdetails", component: PaymentDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
