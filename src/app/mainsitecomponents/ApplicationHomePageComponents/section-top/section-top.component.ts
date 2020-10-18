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

  constructor(
    private adminService: AdminService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.adminService.getProducts().subscribe(data => {
      data["products"].forEach(element => {
        this.products.push(element.value);
      });
      data["productList"].forEach(element => {
        this.products.push(element.productSubcategory);
      });
    });
  }
  selected: string;
  products: Array<string> = new Array<string>();
  NavigateToOrder() {
    let param = { queryParams: { selectedProduct: this.selected } };
    this.helper.navigateToPathWithparams("/createorder", param);
  }
}
