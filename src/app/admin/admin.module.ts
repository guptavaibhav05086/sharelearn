import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { LeftnavComponent } from "./leftnav/leftnav.component";
import { TopnavComponent } from "./topnav/topnav.component";
import { NavbarcommonComponent } from "./navbarcommon/navbarcommon.component";
import { ProductsComponent } from "./products/products.component";
import { AgGridModule } from "ag-grid-angular";
import { ButtonrendererComponent } from "./buttonrenderer/buttonrenderer.component";
import { ProductsFormsComponent } from "./products-forms/products-forms.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProductListsComponent } from './product-lists/product-lists.component';
import { PrintRatesComponent } from './print-rates/print-rates.component';
import { RegsiterProfilesComponent } from './regsiter-profiles/regsiter-profiles.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';
import { VendorPayoutsComponent } from './vendor-payouts/vendor-payouts.component';
import { PayoutFormComponent } from './payout-form/payout-form.component';
import { ViewDesignerProfileComponent } from './view-designer-profile/view-designer-profile.component';
import { ViewPrinterProfileComponent } from './view-printer-profile/view-printer-profile.component';
@NgModule({
  declarations: [
    AdminComponent,
    LeftnavComponent,
    TopnavComponent,
    NavbarcommonComponent,
    ProductsComponent,
    ButtonrendererComponent,
    ProductsFormsComponent,
    ProductListsComponent,
    PrintRatesComponent,
    RegsiterProfilesComponent,
    DiscountFormComponent,
    VendorPayoutsComponent,
    PayoutFormComponent,
    ViewDesignerProfileComponent,
    ViewPrinterProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgGridModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
