import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-order-page",
  templateUrl: "./order-page.component.html",
  styleUrls: ["./order-page.component.css"]
})
export class OrderPageComponent implements OnInit {
  minDate: NgbDateStruct;
  model: NgbDateStruct;
  productList;
  products;
  selectedCategory;
  checkedProduct;
  displayCategory = false;
  displaySpecs = false;
  displayMeetings = false;
  displayprinter = false;
  displaysummary = false;
  meetingSlots = [
    "10:00 AM -11:00 AM",
    "11:00 AM -12:00 AM",
    "12:00 AM -1:00 PM",
    "1:00 PM -2:00 PM",
    "2:00 PM -3:00 PM",
    "3:00 PM -4:00 PM",
    "4:00 PM -5:00 PM",
    "5:00 PM -6:00 PM",
    "6:00 PM -7:00 PM",
    "7:00 PM -8:00 PM",
    "8:00 PM -9:00 PM",
    "9:00 PM -10:00 PM"
  ];

  orderForm = new FormGroup({
    type: new FormControl(""),
    category: new FormControl(""),
    subCategory: new FormControl("", [Validators.required]),
    orientation: new FormControl("", [Validators.required]),
    size: new FormControl("", [Validators.required]),
    GSM: new FormControl("0", [Validators.required]),
    quantities: new FormControl("0", [Validators.required]),
    meetingDate: new FormControl({}),
    meetingSlot: new FormControl("")
  });

  proSpec = {
    orientation: [],
    size: [],
    gsm: [],
    quantities: [],
    subcat: [],
    displayQuant: []
  };
  constructor(private admin: AdminService) {}

  proceedOrder() {
    this.displayMeetings = true;
  }
  dateSet() {
    if (
      this.orderForm.controls["meetingDate"].value != "" &&
      this.orderForm.controls["meetingSlot"].value == ""
    ) {
      this.displaysummary = false;
    } else {
      this.displaysummary = true;
    }
    //alert(this.orderForm.controls["meetingDate"].value);
    //alert(this.orderForm.controls["meetingSlot"].value);
    //alert("Date set is called");
  }
  resetControls() {
    this.orderForm.patchValue({
      category: "",

      subCategory: "",
      orientation: "",
      size: "",
      GSM: "",
      quantities: "",
      meetingDate: "",
      meetingSlot: ""
    });
    this.displaySpecs = false;
    this.displayMeetings = false;
    this.displaysummary = false;
  }
  showCategory(category) {
    debugger;
    this.resetControls();
    this.selectedCategory = this.products.filter(
      item => item.category == category || item.category == "Design And Print"
    );
    if (category == "Design And Print") {
      this.displayprinter = true;
    } else {
      this.displayprinter = false;
    }
    this.displayCategory = true;
    this.orderForm.patchValue({
      type: category
    });
  }
  ngOnInit(): void {
    this.admin.getProducts().subscribe(
      data => {
        this.productList = data["productList"];
        this.products = data["products"];
      },
      err => {}
    );
    let date = new Date();
    let initialDate = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getUTCDate()
    };
    this.minDate = initialDate;
    this.model = initialDate;
    this.orderForm.patchValue({
      meetingDate: initialDate
    });
  }
  selectedProduct(value) {
    this.checkedProduct = this.productList.filter(
      item => item.productName == value
    );
    this.resetControls();
    this.proSpec.subcat = [];
    this.proSpec.size = [];
    this.proSpec.orientation = [];
    this.proSpec.quantities = [];
    this.proSpec.gsm = [];

    this.checkedProduct.forEach((element, index) => {
      this.proSpec.subcat.push(element.productSubcategory);
      this.proSpec.size.push(element.productSize);
      this.proSpec.orientation.push(element.orientation);
      this.proSpec.quantities.push({
        size: element.productSize,
        qunat: element.quantities
      });
      this.proSpec.gsm.push(element.paperGSM);
    });

    this.proSpec.gsm = [...new Set(this.proSpec.gsm)];
    this.proSpec.orientation = [...new Set(this.proSpec.orientation)];
    this.proSpec.quantities = [...new Set(this.proSpec.quantities)];
    this.proSpec.size = [...new Set(this.proSpec.size)];
    this.displaySpecs = true;
    this.orderForm.patchValue({
      category: value
    });
    console.log(this.proSpec);
    //this.proSpec.displayQuant=this.proSpec.quantities.sp
  }
  selectedSize(e) {
    debugger;
    let val = e.target.value;
    if (this.proSpec.quantities != null) {
      let quant = this.proSpec.quantities.filter(item => item.size == val)[0];
      if (quant != null && quant != undefined)
        this.proSpec.displayQuant = quant.qunat.split(",");
    }
    console.log(this.orderForm);
  }
}
