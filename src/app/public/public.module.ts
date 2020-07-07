import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//import { HomeComponent } from "./home/home.component";
//import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ComingsoonComponent } from "./comingsoon/comingsoon.component";
import { ErrorMessageComponent } from "./error-message/error-message.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TopnavuserloginComponent } from "./topnavuserlogin/topnavuserlogin.component";

@NgModule({
  declarations: [
    FooterComponent,
    ComingsoonComponent,
    ErrorMessageComponent,
    VerifyEmailComponent,
    PageNotFoundComponent,
    TopnavuserloginComponent
  ],
  imports: [CommonModule],
  exports: [
    FooterComponent,
    ComingsoonComponent,
    ErrorMessageComponent,
    VerifyEmailComponent,
    TopnavuserloginComponent
  ]
})
export class PublicModule {}
