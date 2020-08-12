import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { PrinterService } from "src/app/services/printer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "src/app/services/customer.service";
import { HelperService } from "src/app/services/helper.service";
import { BookMeetingComponent } from "../book-meeting/book-meeting.component";
import { AdminService } from "src/app/services/admin.service";
@Component({
  selector: "app-review-order",
  templateUrl: "./review-order.component.html",
  styleUrls: ["./review-order.component.css"]
})
export class ReviewOrderComponent implements OnInit {
  razorPayOrderId: any;
  selectedSlot = {
    data: {},
    selectedDate: "",
    selectedTime: "",
    duration: 0
  };
  userCart = {
    designNprint: [],
    design: [],
    print: [],
    displayPrint: false,
    displayDesign: false,
    displayDesignNPrint: false,
    finalPrice: {
      calPrice: 0,
      calDelivery: 0,
      calGST: 0,
      calFinalTotal: 0,
      calDiscount: 0,
      calDiscountedTotal: 0
    },
    totalItems: 0
  };
  toggleDisplayItems = false;
  displayTranFail = false;
  name = "Show Products";
  selectedAddress: any;
  toggleItems(event) {
    event.preventDefault();
    if (this.toggleDisplayItems) {
      this.toggleDisplayItems = false;
      this.name = "Show Products";
    } else {
      this.toggleDisplayItems = true;
      this.name = "Hide Products";
    }
  }

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private printer: PrinterService,
    private custService: CustomerService,
    private modalService: NgbModal,
    private admin: AdminService
  ) {}

  ngOnInit(): void {
    this.admin.getProducts().subscribe(
      data => {
        //this.discountPrice=data["discountList"];
        this.custService.discountedPrice = data["discountList"];
        console.log(this.custService.discountedPrice);
        debugger;
        this.loadCart();
        //debugger;
      },
      err => {}
    );

    this.generateOrderId();
  }
  transactionUpdate(event) {
    debugger;
    if (event.tranId == null) {
      this.displayTranFail = true;
      let origin = this.document.location.origin;
      let url = origin + "/orderstatus?tranId=" + null;
      window.location.href = url;
    } else {
      debugger;
      this.displayTranFail = false;
      let origin = this.document.location.origin;
      let url = origin + "/orderstatus?tranId=" + event.tranId;
      window.location.href = url;

      // this.router.navigate(["/ordersuccess"], {
      //   queryParams: { tranId: event.tranId }
      // });
      this.router.navigateByUrl("/ordersuccess").then(e => {
        if (e) {
          console.log("navigation successful");
        } else {
          console.log("navigation failed");
        }
      });
      //window.location.reload();
    }
    console.log(event);
  }
  loadCart() {
    debugger;
    this.selectedAddress = JSON.parse(localStorage.getItem("selectedAddess"));

    let cartItems = JSON.parse(localStorage.getItem("cart"));
    this.userCart.totalItems = cartItems.length;
    if (cartItems != null && cartItems.length > 0) {
      cartItems.forEach(item => {
        if (item.type == "Design And Print") {
          item.category[0].id = item.id;
          this.userCart.designNprint.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery +=
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
        } else if (item.type == "Design Only") {
          item.category[0].id = item.id;
          console.log(item.category[0]);
          this.userCart.design.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery +=
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
        } else if (item.type == "Print Only") {
          item.category[0].id = item.id;
          this.userCart.print.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery +=
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
          //return ;
        }
      });

      if (this.userCart.designNprint.length > 0) {
        this.userCart.displayDesignNPrint = true;
      }

      if (this.userCart.design.length > 0) {
        this.userCart.displayDesign = true;
      }

      if (this.userCart.print.length > 0) {
        this.userCart.displayPrint = true;
      }
    }
    console.log(this.userCart);
    this.calculateDiscounts();
  }
  calculateDiscounts() {
    let totalpriceWithoutDelivery =
      this.userCart.finalPrice.calPrice + this.userCart.finalPrice.calGST;
    let perc = this.custService.getDiscountPercentage(
      totalpriceWithoutDelivery
    );
    if (perc > 0) {
      let discount = Math.round(totalpriceWithoutDelivery * (perc / 100));
      this.userCart.finalPrice.calDiscount = discount;
      this.userCart.finalPrice.calDiscountedTotal =
        this.userCart.finalPrice.calPrice +
        this.userCart.finalPrice.calGST -
        discount +
        this.userCart.finalPrice.calDelivery;
    } else {
      this.userCart.finalPrice.calDiscountedTotal = this.userCart.finalPrice.calFinalTotal;
    }
  }
  generateOrderId() {
    this.bookMeeting();
    this.printer
      .generateOrderId(this.userCart.finalPrice.calFinalTotal * 100)
      .subscribe(
        data => {
          this.razorPayOrderId = data;

          //this.payWithRazor(data);
        },
        err => {}
      );
  }
  changeSlot(e) {
    e.preventDefault();
    this.bookMeeting();
  }
  bookMeeting() {
    let modelRef = this.modalService.open(BookMeetingComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.result.then(data => {
      debugger;
      console.log(data);
      this.custService.setMeetingSlot(data);
      this.selectedSlot.data = data;
      this.selectedSlot.selectedDate =
        data.mDate.day + "/" + data.mDate.month + "/" + data.mDate.year;
      this.selectedSlot.selectedTime =
        data.mSlot.hour +
        ":" +
        (data.mSlot.minute == 0 ? "00" : data.mSlot.minute) +
        ":" +
        (data.mSlot.second == 0 ? "00" : data.mSlot.second) +
        "  " +
        (data.mSlot.hour >= 12 ? "PM" : "AM");
      this.selectedSlot.duration = data.duration;

      //this.helper.navigateToPath("/revieworder");
    });
  }
  removeItem(id) {
    var result = confirm("Do you want to delete the item from the cart");
    if (result) {
      this.custService.deletItemFromCart(id);
      this.resetCart();
      this.loadCart();
    }
  }
  editItem(id) {
    debugger;
    this.router.navigate(["/createorder"], { queryParams: { itemId: id } });
  }
  resetCart() {
    this.userCart = {
      designNprint: [],
      design: [],
      print: [],
      displayPrint: false,
      displayDesign: false,
      displayDesignNPrint: false,
      finalPrice: {
        calPrice: 0,
        calDelivery: 0,
        calGST: 0,
        calFinalTotal: 0,
        calDiscountedTotal:0,
        calDiscount:0
      },
      totalItems: 0
    };
  }
}
