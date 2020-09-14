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
import { JavascriptComponent } from "./courseComponets/javascript/javascript.component";
import { DotnetComponent } from "./courseComponets/dotnet/dotnet.component";
import { JavaComponent } from "./courseComponets/java/java.component";
import { AllcoursesComponent } from "./courseComponets/allcourses/allcourses.component";
import { RegistercoursComponent } from "./otherComponents/registercours/registercours.component";
import { ContactusComponent } from "../../src/app/public/contactus/contactus.component";
import { MeanComponent } from "./courseComponets/mean/mean.component";
import { MernComponent } from "./courseComponets/mern/mern.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { ResetpasswordComponent } from "./auth/resetpassword/resetpassword.component";
import { UsersignupComponent } from "./auth/usersignup/usersignup.component";
import { DesignerprofileComponent } from "./students/designerprofile/designerprofile.component";

import { ComingsoonComponent } from "../app/public/comingsoon/comingsoon.component";
import { ErrorMessageComponent } from "../app/public/error-message/error-message.component";
import { VerifyEmailComponent } from "../app/public/verify-email/verify-email.component";
import { PageNotFoundComponent } from "./public/page-not-found/page-not-found.component";
import { OrderPageComponent } from "./mainsitecomponents/order-page/order-page.component";
import { HomelinkPageComponent } from "./mainsitecomponents/homelink-page/homelink-page.component";
import { SelectAddressComponent } from "./mainsitecomponents/select-address/select-address.component";
import { OrderCartComponent } from "./mainsitecomponents/order-cart/order-cart.component";
import { ReviewOrderComponent } from "./mainsitecomponents/review-order/review-order.component";
import { DisplayMessagesComponent } from './mainsitecomponents/display-messages/display-messages.component'
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
        component: HomelinkPageComponent
      },
      {
        path: "home",
        component: HomelinkPageComponent
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
      // {
      //   path: "cart",
      //   component: OrderCartComponent
      // },
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
        path: "resetpassword",
        component: ResetpasswordComponent
      },
      { path: "designerprofile", component: DesignerprofileComponent },
      { path: "verifyemail", component: VerifyEmailComponent },
      { path: "verifyvendors", component: ErrorMessageComponent }
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
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
