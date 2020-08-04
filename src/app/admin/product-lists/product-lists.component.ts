import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Productlist } from "src/app/Models/productlist";
@Component({
  selector: "app-product-lists",
  templateUrl: "./product-lists.component.html",
  styleUrls: ["./product-lists.component.css"]
})
export class ProductListsComponent implements OnInit {
  @Input() isEdit;
  @Input() selProduct;
  product = new Productlist();
  updateSuccess = false;
  productform = new FormGroup({
    Pname: new FormControl("", [Validators.required]),

    preferenece: new FormControl("", [Validators.required]),
    classification:new FormControl("", [Validators.required])
  });
  constructor(
    public activeModal: NgbActiveModal,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    debugger;
    if (this.isEdit) {
      this.productform.patchValue({
        Pname: this.selProduct["value"],
        preferenece: this.selProduct["producPreference"],
        classification:this.selProduct["category"]
        //category
      });
    }
  }

  CreateNewproduct() {}
  updateNewproduct() {
    if (this.isEdit) {
      this.product.productId = this.selProduct["key"];
    } else {
      this.product.productId = 0;
    }

    this.product.productName = this.productform.controls["Pname"].value;
    this.product.producPreference = this.productform.controls[
      "preferenece"
    ].value;
    this.product.productCategory = this.productform.controls[
      "classification"
    ].value
    this.service.updateProductList(this.product).subscribe(
      data => {
        this.updateSuccess = true;
      },
      err => {}
    );
  }
}
