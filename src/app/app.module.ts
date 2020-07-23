import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "../app/public/home/home.component";
import { HomecontentComponent } from "../app/public/homecontent/homecontent.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PublicModule } from "../app/public/public.module";
import { AboutComponent } from "./otherComponents/about/about.component";
import { NavbarComponent } from "./public/navbar/navbar.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactComponent } from "./courseComponets/react/react.component";
import { AngularComponent } from "./courseComponets/angular/angular.component";
import { FAQComponent } from "./courseComponets/faq/faq.component";
import { NodeComponent } from "./courseComponets/node/node.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { JavascriptComponent } from "./courseComponets/javascript/javascript.component";
import { DotnetComponent } from "./courseComponets/dotnet/dotnet.component";
import { JavaComponent } from "./courseComponets/java/java.component";
import { AllcoursesComponent } from "./courseComponets/allcourses/allcourses.component";
import { RegistercoursComponent } from "./otherComponents/registercours/registercours.component";
import { HttpClientModule } from "@angular/common/http";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { ReactiveFormsModule } from "@angular/forms";
import { ContactusComponent } from "../../src/app/public/contactus/contactus.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { MeanComponent } from "./courseComponets/mean/mean.component";
import { MernComponent } from "./courseComponets/mern/mern.component";
import { CarouselholderComponent } from "../app/public/carouselholder/carouselholder.component";
import { NavbaruserComponent } from "../app/public/navbaruser/navbaruser.component";

import { NavbarcommonComponent } from "../app/public/navbarcommon/navbarcommon.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { ReviewsComponent } from "./courseComponets/reviews/reviews.component";
import { NgxStarRatingModule } from "ngx-star-rating";
import { ForgetpasswordComponent } from "./auth/forgetpassword/forgetpassword.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ResetpasswordComponent } from "./auth/resetpassword/resetpassword.component";
import { UsersignupComponent } from "./auth/usersignup/usersignup.component";
import { DesignersignupComponent } from "./auth/designersignup/designersignup.component";
import { PrintersignupComponent } from "./auth/printersignup/printersignup.component";
import { AgGridModule } from "ag-grid-angular";
import { OrderPageComponent } from "./mainsitecomponents/order-page/order-page.component";
import { HomelinkPageComponent } from "./mainsitecomponents/homelink-page/homelink-page.component";
import { AboutusPopupComponent } from "./mainsitecomponents/aboutus-popup/aboutus-popup.component";
import { SelectAddressComponent } from "./mainsitecomponents/select-address/select-address.component";
import { AddressFormComponent } from "./mainsitecomponents/address-form/address-form.component";
import { GoogleplacesComponent } from "./mainsitecomponents/googleplaces/googleplaces.component";
import { OrderCartComponent } from "./mainsitecomponents/order-cart/order-cart.component";
import { ReviewOrderComponent } from "./mainsitecomponents/review-order/review-order.component";
@NgModule({
  declarations: [
    AppComponent,
    NavbarcommonComponent,
    HomeComponent,
    HomecontentComponent,
    AboutComponent,
    ReactComponent,
    AngularComponent,
    FAQComponent,
    NodeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    JavascriptComponent,
    DotnetComponent,
    JavaComponent,
    AllcoursesComponent,
    RegistercoursComponent,
    ContactusComponent,
    MeanComponent,
    MernComponent,
    CarouselholderComponent,
    NavbaruserComponent,
    LogoutComponent,
    ReviewsComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    UsersignupComponent,
    DesignersignupComponent,
    PrintersignupComponent,
    OrderPageComponent,
    HomelinkPageComponent,
    AboutusPopupComponent,
    SelectAddressComponent,
    AddressFormComponent,
    GoogleplacesComponent,
    OrderCartComponent,
    ReviewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    HttpClientModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSpinnerModule,
    NgxStarRatingModule,
    NgbModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NavbaruserComponent],
  entryComponents: [ForgetpasswordComponent]
})
export class AppModule {}
