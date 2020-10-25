import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { WindowRefService } from "src/app/services/window-ref.service";
import { HelperService } from "src/app/services/helper.service";
import { DOCUMENT } from "@angular/common";
import { AdminService } from "src/app/services/admin.service";
@Component({
  selector: "app-section-top",
  templateUrl: "./section-top.component.html",
  styleUrls: ["./section-top.component.css"]
})
export class SectionTopComponent implements OnInit {
  imgUrl = "../../../../assets/HomePageImg/Sec1.jpg";
  productsdata: any;
  constructor(
    private adminService: AdminService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    debugger;
    this.adminService.getProducts().subscribe(data => {
      this.productsdata = data;
      data["products"].forEach(element => {
        if (element.IsDisabled == false) {
          this.products.push(element.value.trim());
        }
        //this.products.push(element.value);
      });
      data["productList"].forEach(element => {
        if (element.IsDisabled == false) {
          this.products.push(element.productSubcategory.trim());
        }
        //this.products.push(element.productSubcategory);
      });

      this.products = [...new Set(this.products)];
    });
  }
  selected: string;
  products: Array<string> = new Array<string>();
  NavigateToOrder() {
    let params = { selectedProduct: null, selSubCat: null };
    let filteredData = this.productsdata["productList"].filter(
      item => item.productSubcategory == this.selected
    );
    if (filteredData.length > 0) {
      params.selSubCat = filteredData[0].productSubcategory;
      params.selectedProduct = filteredData[0].productName;
    } else {
      params.selectedProduct = this.selected;
    }
    let param = { queryParams: params };
    this.helper.navigateToPathWithparams("/createorder", param);
  }
}
