import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PublicModule } from "../public/public.module";
import { StudentsRoutingModule } from "./students-routing.module";
import { StudentsComponent } from "./students.component";
import { DashboadComponent } from "./dashboad/dashboad.component";
import { LeftnavComponent } from "./leftnav/leftnav.component";
import { TopnavComponent } from "./topnav/topnav.component";
import { CoursetakenComponent } from "./coursetaken/coursetaken.component";
import { StudentprofileComponent } from "./studentprofile/studentprofile.component";
import { StudentnavbarcommonComponent } from "./studentnavbarcommon/studentnavbarcommon.component";
import { PaymentsComponent } from "./payments/payments.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SettingsComponent } from "./settings/settings.component";
import { HelpComponent } from "./help/help.component";
import { DesignerprofileComponent } from "./designerprofile/designerprofile.component";
import { VerifyOTPComponent } from "./verify-otp/verify-otp.component";
import { TermsconditionsComponent } from "./termsconditions/termsconditions.component";
import { ReactiveFormsModule } from "@angular/forms";

import { NgxSpinnerModule } from "ngx-spinner";
import { DetailsComponentComponent } from './details-component/details-component.component';



@NgModule({
  declarations: [
    StudentsComponent,
    DashboadComponent,
    LeftnavComponent,
    TopnavComponent,
    CoursetakenComponent,
    StudentprofileComponent,
    StudentnavbarcommonComponent,
    PaymentsComponent,
    NotificationsComponent,
    SettingsComponent,
    HelpComponent,
    DesignerprofileComponent,
    VerifyOTPComponent,
    TermsconditionsComponent,
    DetailsComponentComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    PublicModule,
    NgxSpinnerModule
  ],
  exports: [DesignerprofileComponent]
})
export class StudentsModule {}
