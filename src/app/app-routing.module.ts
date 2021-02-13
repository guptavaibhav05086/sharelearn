import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomecontentComponent } from "../app/public/homecontent/homecontent.component";
import { HomeComponent } from "../app/public/home/home.component";
import { AboutComponent } from "../app/otherComponents/about/about.component";
import { ReactComponent } from "../app/courseComponets/react/react.component";
import { AngularComponent } from "./courseComponets/angular/angular.component";
import { NodeComponent } from "./courseComponets/node/node.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

import { LogoutComponent } from "./auth/logout/logout.component";
import { ResetpasswordComponent } from "./auth/resetpassword/resetpassword.component";
import { UsersignupComponent } from "./auth/usersignup/usersignup.component";
import { DesignerprofileComponent } from "./students/designerprofile/designerprofile.component";

import { ErrorMessageComponent } from "../app/public/error-message/error-message.component";
import { VerifyEmailComponent } from "../app/public/verify-email/verify-email.component";
import { PageNotFoundComponent } from "./public/page-not-found/page-not-found.component";
import { OrderPageComponent } from "./mainsitecomponents/order-page/order-page.component";
import { TermsConditionsComponent } from "./mainsitecomponents/terms-conditions/terms-conditions.component";
import { SelectAddressComponent } from "./mainsitecomponents/select-address/select-address.component";
import { OrderCartComponent } from "./mainsitecomponents/order-cart/order-cart.component";
import { ReviewOrderComponent } from "./mainsitecomponents/review-order/review-order.component";
import { DisplayMessagesComponent } from "./mainsitecomponents/display-messages/display-messages.component";
import { HomeContainerComponent } from "./mainsitecomponents/ApplicationHomePageComponents/home-container/home-container.component";
import { OngoingOrdersComponent } from "./mainsitecomponents/ongoing-orders/ongoing-orders.component";
import { AllOrdersComponent } from "./mainsitecomponents/all-orders/all-orders.component";
import { ServiceProviderComponent } from "./mainsitecomponents/service-provider/service-provider.component";
import { AboutusComponent } from "./mainsitecomponents/aboutus/aboutus.component";
import { ChangePasswordComponent } from "./mainsitecomponents/change-password/change-password.component";
import { BrochureComponent } from "./blogs/brochure/brochure.component";
import { BusineescardsComponent } from "./blogs/busineescards/busineescards.component";
import { BusineesenvelopeComponent } from "./blogs/busineesenvelope/busineesenvelope.component";
import { CertificatesComponent } from "./blogs/certificates/certificates.component";
import { CoverpageComponent } from "./blogs/coverpage/coverpage.component";
import { DigitalmarketComponent } from "./blogs/digitalmarket/digitalmarket.component";
import { FabricbannerComponent } from "./blogs/fabricbanner/fabricbanner.component";
import { FlyerComponent } from "./blogs/flyer/flyer.component";
import { InvitationcardComponent } from "./blogs/invitationcard/invitationcard.component";
import { LabelComponent } from "./blogs/label/label.component";
import { LetterheadComponent } from "./blogs/letterhead/letterhead.component";
import { LogooComponent } from "./blogs/logoo/logoo.component";
import { PosterComponent } from "./blogs/poster/poster.component";
import { CouponComponent } from "./blogs/coupon/coupon.component";
import { CardsComponent } from "./blogs/cards/cards.component";
import { RollupComponent } from "./blogs/rollup/rollup.component";
const routes: Routes = [
  {
    path: "designer",
    loadChildren: () =>
      import("./students/students.module").then(m => m.StudentsModule)
  },
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: HomeContainerComponent
      },
      {
        path: "home",
        component: HomeContainerComponent
      },
      {
        path: "homePage",
        component: HomeContainerComponent
      },
      // {
      //   path: "about",
      //   component: AboutComponent
      // },

      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "registeruser",
        component: UsersignupComponent
      },
      {
        path: "createorder",
        component: OrderPageComponent
      },
      {
        path: "revieworder",
        component: ReviewOrderComponent
      },
      {
        path: "orderstatus",
        component: DisplayMessagesComponent
      },
      {
        path: "selectAddress",
        component: SelectAddressComponent
      },
      {
        path: "cart",
        component: OrderCartComponent
      },
      // {
      //   path: "registerCourse",
      //   component: RegistercoursComponent
      // },
      // {
      //   path: "contact",
      //   component: ContactusComponent
      // },

      {
        path: "logout",
        component: LogoutComponent
      },
      {
        path: "terms",
        component: TermsConditionsComponent
      },
      {
        path: "resetpassword",
        component: ResetpasswordComponent
      },
      {
        path: "user/settings",
        component: ChangePasswordComponent
      },
      {
        path: "serviceprovider",
        component: ServiceProviderComponent
      },
      {
        path: "aboutus",
        component: AboutusComponent
      },
      { path: "designerprofile", component: DesignerprofileComponent },
      { path: "verifyemail", component: VerifyEmailComponent },
      { path: "verifyvendors", component: ErrorMessageComponent },
      { path: "user/ongoingorders", component: OngoingOrdersComponent },
      { path: "user/allorders", component: AllOrdersComponent },
      { path: "blogs/tips-on-brochure", component: BrochureComponent },
      {
        path: "blogs/tips-on-business-cards",
        component: BusineescardsComponent
      },
      {
        path: "blogs/tips-on-business-envelope",
        component: BusineesenvelopeComponent
      },
      { path: "blogs/tips-on-certificates", component: CertificatesComponent },
      { path: "blogs/tips-on-cover-page", component: CoverpageComponent },
      {
        path: "blogs/tips-on-digital-marketing-banners",
        component: DigitalmarketComponent
      },
      {
        path: "blogs/tips-on-fabric-banners",
        component: FabricbannerComponent
      },
      {
        path: "blogs/tips-on-invitation-cards",
        component: InvitationcardComponent
      },
      { path: "blogs/tips-on-labels", component: LabelComponent },
      { path: "blogs/tips-on-letterhead", component: LetterheadComponent },
      { path: "blogs/tips-on-logo", component: LogooComponent },
      { path: "blogs/tips-on-posters", component: PosterComponent },
      { path: "blogs/tips-on-promotional-coupon", component: CouponComponent },
      { path: "blogs/tips-on-report-cards", component: CardsComponent },
      { path: "blogs/tips-on-roll-up-standees", component: RollupComponent },
      {
        path: "blogs/tips-on-flyer",
        component: FlyerComponent
      }
    ]
  },
  {
    path: "printers",
    loadChildren: () =>
      import("./printers/printers.module").then(m => m.PrintersModule)
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "customers",
    loadChildren: () =>
      import("./customers/customers.module").then(m => m.CustomersModule)
  }
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
