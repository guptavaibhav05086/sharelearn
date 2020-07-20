import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { ProductsComponent } from "./products/products.component";
import { ProductsFormsComponent } from "./products-forms/products-forms.component";
const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "products", component: ProductsComponent },
      { path: "productsform", component: ProductsFormsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}