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
// import { CarouselModule } from "ngx-owl-carousel-o";
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
import { BookMeetingComponent } from "./mainsitecomponents/book-meeting/book-meeting.component";
import { RazorpaymentsComponent } from "./mainsitecomponents/razorpayments/razorpayments.component";
import { DisplayMessagesComponent } from "./mainsitecomponents/display-messages/display-messages.component";
import { PriceDescriptionComponent } from "./mainsitecomponents/price-description/price-description.component";
import { TermsConditionsComponent } from "./mainsitecomponents/terms-conditions/terms-conditions.component";
import { SectionTopComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-top/section-top.component";
import { SectionDescriptionComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-description/section-description.component";
import { SectionProductDescriptionComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-product-description/section-product-description.component";
import { SectionProductsComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-products/section-products.component";
import { SectionFooterComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-footer/section-footer.component";
import { HomeContainerComponent } from "./mainsitecomponents/ApplicationHomePageComponents/home-container/home-container.component";
import { HowItWorkComponent } from "./mainsitecomponents/ApplicationHomePageComponents/how-it-work/how-it-work.component";
import { HowWeDesignComponent } from "./mainsitecomponents/ApplicationHomePageComponents/how-we-design/how-we-design.component";
import { SectionTopNavComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-top-nav/section-top-nav.component";

import { PproductsCarouselComponent } from "./mainsitecomponents/ApplicationHomePageComponents/pproducts-carousel/pproducts-carousel.component";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { HowWePrintComponent } from "./mainsitecomponents/ApplicationHomePageComponents/how-we-print/how-we-print.component";
import { SectionPlanComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-plan/section-plan.component";
import { SectionBrandComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-brand/section-brand.component";
import { SectionSocialMediaComponent } from "./mainsitecomponents/ApplicationHomePageComponents/section-social-media/section-social-media.component";
import { CustomerSignUpComponent } from "./auth/customer-sign-up/customer-sign-up.component";
import { CustomerLoginComponent } from "./auth/customer-login/customer-login.component";

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
    ReviewOrderComponent,
    BookMeetingComponent,
    RazorpaymentsComponent,
    DisplayMessagesComponent,
    PriceDescriptionComponent,
    TermsConditionsComponent,
    SectionTopComponent,
    SectionDescriptionComponent,
    SectionProductDescriptionComponent,
    SectionProductsComponent,
    SectionFooterComponent,
    HomeContainerComponent,
    HowItWorkComponent,
    HowWeDesignComponent,
    SectionTopNavComponent,
    PproductsCarouselComponent,
    HowWePrintComponent,
    SectionPlanComponent,
    SectionBrandComponent,
    SectionSocialMediaComponent,
    CustomerSignUpComponent,
    CustomerLoginComponent
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
  providers: [
    // AuthService,
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: socialConfigs
    // }
  ],
  bootstrap: [AppComponent],
  exports: [NavbaruserComponent],
  entryComponents: [ForgetpasswordComponent]
})
export class AppModule {}
