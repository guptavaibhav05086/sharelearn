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
import { AllOrdersComponent } from "../app/mainsitecomponents/all-orders/all-orders.component";
import { ActiveOrdersComponent } from "../app/mainsitecomponents/active-orders/active-orders.component";
import { ButtonrendererComponent } from "../app/mainsitecomponents/buttonrenderer/buttonrenderer.component";
import { OngoingOrdersComponent } from "../app/mainsitecomponents/ongoing-orders/ongoing-orders.component";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ServiceProviderComponent } from './mainsitecomponents/service-provider/service-provider.component';
import { AboutusComponent } from './mainsitecomponents/aboutus/aboutus.component';
import { ChangePasswordComponent } from './mainsitecomponents/change-password/change-password.component';
import { VerifyOTPComponent } from './mainsitecomponents/verify-otp/verify-otp.component';
import { BrochureComponent } from './blogs/brochure/brochure.component';
import { BusineescardsComponent } from './blogs/busineescards/busineescards.component';
import { BusineesenvelopeComponent } from './blogs/busineesenvelope/busineesenvelope.component';
import { CertificatesComponent } from './blogs/certificates/certificates.component';
import { CoverpageComponent } from './blogs/coverpage/coverpage.component';
import { DigitalmarketComponent } from './blogs/digitalmarket/digitalmarket.component';
import { FabricbannerComponent } from './blogs/fabricbanner/fabricbanner.component';
import { FlyerComponent } from './blogs/flyer/flyer.component';
import { InvitationcardComponent } from './blogs/invitationcard/invitationcard.component';
import { LabelComponent } from './blogs/label/label.component';
import { LetterheadComponent } from './blogs/letterhead/letterhead.component';
import { LogooComponent } from './blogs/logoo/logoo.component';
import { PosterComponent } from './blogs/poster/poster.component';
import { CouponComponent } from './blogs/coupon/coupon.component';
import { CardsComponent } from './blogs/cards/cards.component';
import { RollupComponent } from './blogs/rollup/rollup.component';
@NgModule({
  declarations: [
    AppComponent,
    AllOrdersComponent,
    ActiveOrdersComponent,
    ButtonrendererComponent,
    OngoingOrdersComponent,
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
    CustomerLoginComponent,
    ServiceProviderComponent,
    AboutusComponent,
    ChangePasswordComponent,
    VerifyOTPComponent,
    BrochureComponent,
    BusineescardsComponent,
    BusineesenvelopeComponent,
    CertificatesComponent,
    CoverpageComponent,
    DigitalmarketComponent,
    FabricbannerComponent,
    FlyerComponent,
    InvitationcardComponent,
    LabelComponent,
    LetterheadComponent,
    LogooComponent,
    PosterComponent,
    CouponComponent,
    CardsComponent,
    RollupComponent
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
    AgGridModule.withComponents([]),
    TypeaheadModule.forRoot()
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
