import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { Discounts } from "src/app/Models/discounts";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-discount-form",
  templateUrl: "./discount-form.component.html",
  styleUrls: ["./discount-form.component.css"]
})
export class DiscountFormComponent implements OnInit {
  discount: Discounts;
  @Input() item;
  @Input() editForm;
  productform = new FormGroup({
    Pname: new FormControl("", [Validators.required]),

    preferenece: new FormControl("", [Validators.required])
  });
  constructor(
    private service: AdminService,
    public activeModal: NgbActiveModal
  ) {}
  updateSuccess = false;
  ngOnInit(): void {
    this.discount = new Discounts();
    if (this.item != undefined && this.item != null) {
      this.editForm = true;
      this.productform.patchValue({
        Pname: this.item.CartAmount,
        preferenece: this.item.DiscountPercentage
      });
      this.discount.DiscountId = this.item.DiscountId;
    } else {
      this.discount.DiscountId = 0;
    }
  }
  updateDiscount() {
    this.discount.CartAmount = this.productform.controls["Pname"].value;
    this.discount.DiscountPercentage = this.productform.controls[
      "preferenece"
    ].value;

    this.service.setDiscounts(this.discount).subscribe(
      item => {
        console.log(item);
        this.updateSuccess = true;
      },
      err => {
        this.updateSuccess = false;
      }
    );
  }
}
