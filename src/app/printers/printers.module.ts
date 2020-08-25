import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PublicModule } from "../public/public.module";
import { PrintersRoutingModule } from "./printers-routing.module";
import { PrintersComponent } from "./printers.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PrinterprofileComponent } from "./printerprofile/printerprofile.component";
import { HelpComponent } from "./help/help.component";
import { LeftnavComponent } from "./leftnav/leftnav.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { PaymentsComponent } from "./payments/payments.component";
import { SettingsComponent } from "./settings/settings.component";
import { NavbarcommonComponent } from "./navbarcommon/navbarcommon.component";
import { VerifyOTPComponent } from "./verify-otp/verify-otp.component";
import { TopnavComponent } from "./topnav/topnav.component";
import { TermsconditionsComponent } from "./termsconditions/termsconditions.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RazorpaymentsComponent } from "./razorpayments/razorpayments.component";
import { TransactionsuccessdetailsComponent } from "./transactionsuccessdetails/transactionsuccessdetails.component";
import { GoogleplacesComponent } from "./googleplaces/googleplaces.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { DetailsComponentComponent } from './details-component/details-component.component';

@NgModule({
  declarations: [
    PrintersComponent,
    DashboardComponent,
    PrinterprofileComponent,
    HelpComponent,
    LeftnavComponent,
    NotificationsComponent,
    PaymentsComponent,
    SettingsComponent,
    NavbarcommonComponent,
    VerifyOTPComponent,
    TopnavComponent,
    TermsconditionsComponent,
    RazorpaymentsComponent,
    TransactionsuccessdetailsComponent,
    GoogleplacesComponent,
    DetailsComponentComponent
  ],
  imports: [
    CommonModule,
    PrintersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PublicModule,
    NgxSpinnerModule
  ]
})
export class PrintersModule {}
