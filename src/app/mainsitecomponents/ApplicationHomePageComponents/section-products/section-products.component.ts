import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { HelperService } from "src/app/services/helper.service";
@Component({
  selector: "app-section-products",
  templateUrl: "./section-products.component.html",
  styleUrls: ["./section-products.component.css"]
})
export class SectionProductsComponent implements OnInit {
  products: Array<string> = new Array<string>();
  constructor(
    private adminService: AdminService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.adminService.getProducts().subscribe(data => {
      debugger;
      data["products"].forEach(element => {
        let item = {
          pName: element.value,
          pSub: null,
          displayN: element.value
        };
        this.products.push(element.value.trim());
      });

      this.products = [...new Set(this.products)];
    });
  }
  navigateToProduct(prodName, e) {
    e.preventDefault();
    let params = { selectedProduct: prodName };
    this.helper.navigateToPathWithparams("/createorder", {
      queryParams: params
    });
  }
}
