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
import { TestformsComponent } from "./students/testforms/testforms.component";
import { ComingsoonComponent } from "../app/public/comingsoon/comingsoon.component";
import { ErrorMessageComponent } from "../app/public/error-message/error-message.component";
import { VerifyEmailComponent } from "../app/public/verify-email/verify-email.component";
const routes: Routes = [
  {
    path: "designer",
    loadChildren: () =>
      import("./students/students.module").then(m => m.StudentsModule)
  },
  {
    path: "trainers",
    loadChildren: () =>
      import("./trainers/trainers.module").then(m => m.TrainersModule)
  },
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: ComingsoonComponent
      },
      {
        path: "home",
        component: HomecontentComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "react",
        component: ReactComponent
      },
      {
        path: "angular",
        component: AngularComponent
      },
      {
        path: "javascript",
        component: JavascriptComponent
      },
      {
        path: "node",
        component: NodeComponent
      },
      {
        path: "dotnet",
        component: DotnetComponent
      },
      {
        path: "java",
        component: JavaComponent
      },
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
        path: "explorecourses",
        component: AllcoursesComponent
      },
      {
        path: "registerCourse",
        component: RegistercoursComponent
      },
      {
        path: "contact",
        component: ContactusComponent
      },
      {
        path: "mean",
        component: MeanComponent
      },
      {
        path: "mern",
        component: MernComponent
      },
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
      { path: "errorVerify", component: ErrorMessageComponent }
    ]
  },
  {
    path: "printers",
    loadChildren: () =>
      import("./printers/printers.module").then(m => m.PrintersModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
