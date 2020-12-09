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
      { path: "user/allorders", component: AllOrdersComponent }
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
