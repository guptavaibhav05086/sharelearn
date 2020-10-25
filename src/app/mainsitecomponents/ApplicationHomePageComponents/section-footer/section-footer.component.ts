import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: "app-section-footer",
  templateUrl: "./section-footer.component.html",
  styleUrls: ["./section-footer.component.css"]
})
export class SectionFooterComponent implements OnInit {
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}
  navigateToProduct(prodName, e) {
    e.preventDefault();
    let params = { selectedProduct: prodName };
    this.helper.navigateToPathWithparams("/createorder", {
      queryParams: params
    });
  }
  navigateTopath(path, e) {
    e.preventDefault();

    this.helper.navigateToPath(path);
  }
}
