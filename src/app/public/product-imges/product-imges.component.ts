import { Component, OnInit, Input } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-product-imges",
  templateUrl: "./product-imges.component.html",
  styleUrls: ["./product-imges.component.css"]
})
export class ProductImgesComponent implements OnInit {
  @Input() prodId;
  @Input() prodName;
  imageProducts: any;
  constructor(
    private service: CustomerService,
    private activeModel: NgbActiveModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    debugger;
    console.log(this.prodId);
    this.spinner.show();
    this.service.GetProductImages(this.prodId).subscribe(
      item => {
        this.imageProducts = item;
        this.spinner.hide();
        console.log(item);
      },
      err => {
        this.spinner.hide();
      }
    );
  }
  CloseButton() {
    this.activeModel.dismiss();
  }
}
