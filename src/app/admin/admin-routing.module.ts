import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { ProductsComponent } from "./products/products.component";
import { ProductsFormsComponent } from "./products-forms/products-forms.component";
import { RegsiterProfilesComponent } from './regsiter-profiles/regsiter-profiles.component';
import { AdminGuard } from './admin.guard';
const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate:[AdminGuard],
    children: [
      { path: "products", component: ProductsComponent },
      { path: "productsform", component: ProductsFormsComponent },
      { path: "registeredprofiles", component: RegsiterProfilesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
