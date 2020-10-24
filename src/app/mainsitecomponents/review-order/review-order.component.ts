import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { PrinterService } from "src/app/services/printer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "src/app/services/customer.service";
import { HelperService } from "src/app/services/helper.service";
import { BookMeetingComponent } from "../book-meeting/book-meeting.component";
import { AdminService } from "src/app/services/admin.service";
import { HostListener } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-review-order",
  templateUrl: "./review-order.component.html",
  styleUrls: ["./review-order.component.css"]
})
export class ReviewOrderComponent implements OnInit {
  razorPayOrderId: any;
  interOrderId: any;
  isPrintOrder = "false";
  isCartLoaded = false;
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
      calDiscountedTotal: 0,
      calDiscountedGST: 0,
      calPrintPrice: 0,
      calDesignPrice: 0,
      calDiscountedPrintPrice: 0,
      calDiscountedDesignPrice: 0,
      calDiscountedPrintGST: 0,
      calDiscountedDesignGST: 0,
      printGSTPct: 0,
      designGSTPct: 0
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
    private admin: AdminService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //debugger;

    this.route.queryParams.subscribe(params => {
      //debugger;
      console.log(params); // { order: "popular" }
      //this.cartItemId = params.itemId;
      if (params.isPrintOrder != undefined) {
        this.isPrintOrder = params.isPrintOrder;
      }
      if (this.isPrintOrder != "true") {
        this.bookMeeting();
      }
      // popular
    });
    //this.spinner.show();
    this.admin.getProducts().subscribe(
      data => {
        //this.discountPrice=data["discountList"];
        this.custService.discountedPrice = data["discountList"];
        console.log(this.custService.discountedPrice);
        //debugger;

        this.loadCart();
        this.isCartLoaded = true;
        //this.spinner.hide();
        // if (this.isPrintOrder != "true") {
        //   this.bookMeeting();
        // }
        if (this.isPrintOrder == "true") {
          this.generateOrderId();
        }

        //debugger;
      },
      err => {
        this.spinner.hide();
      }
    );
  }
  @HostListener("window:popstate", ["$event"])
  onPopState(event) {
    console.log("Back button pressed");
  }
  transactionUpdate(event) {
    //debugger;
    if (event.tranId == null) {
      this.displayTranFail = true;
      this.custService.updateFailedTransaction(this.interOrderId).subscribe(data=>{
        let origin = this.document.location.origin;
        let url = origin + "/orderstatus?tranId=" + null;
        window.location.href = url;
      },err=>{

      })
      alert("Transaction Failed for your Order");
      
    } else {
      //debugger;
      try {
        let cart = this.custService.getLocalStorageCart();
        cart.forEach(element => {
          this.custService.deletItemFromCart(element.id);
        });
      } catch (error) {}
      this.displayTranFail = false;
      let origin = this.document.location.origin;
      let url =
        origin +
        "/orderstatus?tranId=" +
        event.tranId +
        "&orderId=" +
        this.razorPayOrderId +
        "&internalId=" +
        this.interOrderId;
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
    //debugger;
    //this.spinner.getSpinner()
    //this.spinner.show("loadcart");
    if (
      localStorage.getItem("selectedAddess") != null &&
      localStorage.getItem("selectedAddess") != ""
    ) {
      this.selectedAddress = JSON.parse(localStorage.getItem("selectedAddess"));
    }
    let cartItems = JSON.parse(localStorage.getItem("cart"));

    if (cartItems != null && cartItems.length > 0) {
      this.userCart.totalItems = cartItems.length;
      cartItems.forEach(item => {
        if (item.type == "Design And Print") {
          item.category[0].id = item.id;
          this.userCart.designNprint.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery =
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
          this.userCart.finalPrice.calPrintPrice +=
            item.category[0].price.printCost;
          this.userCart.finalPrice.calDesignPrice +=
            item.category[0].price.totalDesignCost -
            item.category[0].price.designGST;
          this.userCart.finalPrice.printGSTPct =
            item.category[0].price.printGSTPct;
          this.userCart.finalPrice.designGSTPct =
            item.category[0].price.designGSTPct;
        } else if (item.type == "Design Only") {
          item.category[0].id = item.id;
          console.log(item.category[0]);
          this.userCart.design.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          // this.userCart.finalPrice.calDelivery +=
          //   item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;

          this.userCart.finalPrice.calDesignPrice +=
            item.category[0].price.totalDesignCost -
            item.category[0].price.designGST;

          this.userCart.finalPrice.designGSTPct =
            item.category[0].price.designGSTPct;
        } else if (item.type == "Print Only") {
          item.category[0].id = item.id;
          this.userCart.print.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery =
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
          this.userCart.finalPrice.calPrintPrice +=
            item.category[0].price.printCost;
          this.userCart.finalPrice.printGSTPct =
            item.category[0].price.printGSTPct;

          //return ;
        }
      });

      if (this.userCart.designNprint.length > 0) {
        this.userCart.displayDesignNPrint = true;
      }
      // cartItems.forEach(item => {
      //   if (item.type == "Design Only") {
      //     console.log(item.category[0]);
      //     this.userCart.design.push(item.category[0]);
      //   }
      // });

      if (this.userCart.design.length > 0) {
        this.userCart.displayDesign = true;
      }
      // cartItems.forEach(item => {
      //   if (item.type == "Print Only") {
      //     this.userCart.print.push(item.category[0]);
      //     //return ;
      //   }
      // });

      if (this.userCart.print.length > 0) {
        this.userCart.displayPrint = true;
      }
    } else {
      //this.disableProceed = true;
    }
    this.calculateDiscounts();
    console.log("User cart Data");
    console.log(this.userCart);
    //this.spinner.hide("loadcart");
  }
  calculateDiscounts() {
    debugger;
    let totalpriceWithoutDelivery =
      this.userCart.finalPrice.calPrice + this.userCart.finalPrice.calGST;
    let perc = this.custService.getDiscountPercentage(
      this.userCart.finalPrice.calPrice
    );
    if (perc > 0) {
      let discount = Math.round(totalpriceWithoutDelivery * (perc / 100));

      //Old Calculation
      // this.userCart.finalPrice.calDiscount = discount;
      // this.userCart.finalPrice.calDiscountedTotal =
      //   this.userCart.finalPrice.calPrice +
      //   this.userCart.finalPrice.calGST -
      //   discount +
      //   this.userCart.finalPrice.calDelivery;
      // //this.userCart.finalPrice.calDiscountedGST=discountedGST;
      // this.userCart.finalPrice.calDiscountedGST = this.userCart.finalPrice.calGST;

      //New Calculation
      //let checkPer=this.custService.getDiscountPercentage();
      this.userCart.finalPrice.calDiscount = Math.round(
        this.userCart.finalPrice.calPrintPrice * (perc / 100) +
          this.userCart.finalPrice.calDesignPrice * (perc / 100)
      );

      this.userCart.finalPrice.calDiscountedPrintPrice =
        this.userCart.finalPrice.calPrintPrice -
        this.userCart.finalPrice.calPrintPrice * (perc / 100);

      this.userCart.finalPrice.calDiscountedDesignPrice =
        this.userCart.finalPrice.calDesignPrice -
        this.userCart.finalPrice.calDesignPrice * (perc / 100);

      this.userCart.finalPrice.calDiscountedTotal =
        this.userCart.finalPrice.calDiscountedPrintPrice +
        this.userCart.finalPrice.calDiscountedDesignPrice;

      this.userCart.finalPrice.calDiscountedPrintGST = Math.round(
        this.userCart.finalPrice.calDiscountedPrintPrice *
          this.userCart.finalPrice.printGSTPct
      );

      this.userCart.finalPrice.calDiscountedDesignGST = Math.round(
        this.userCart.finalPrice.calDiscountedDesignPrice *
          this.userCart.finalPrice.designGSTPct
      );

      this.userCart.finalPrice.calDiscountedGST = Math.round(
        this.userCart.finalPrice.calDiscountedPrintPrice *
          this.userCart.finalPrice.printGSTPct +
          this.userCart.finalPrice.calDiscountedDesignPrice *
            this.userCart.finalPrice.designGSTPct
      );

      this.userCart.finalPrice.calDiscountedTotal = Math.round(
        this.userCart.finalPrice.calDiscountedTotal +
          this.userCart.finalPrice.calDiscountedGST +
          this.userCart.finalPrice.calDelivery
      );
    } 
    else {
      this.userCart.finalPrice.calDiscountedTotal = this.userCart.finalPrice.calFinalTotal + this.userCart.finalPrice.calDelivery;
      this.userCart.finalPrice.calDiscountedGST = this.userCart.finalPrice.calGST;
      this.userCart.finalPrice.calDiscountedDesignGST = Math.round(
        this.userCart.finalPrice.calDesignPrice *
          this.userCart.finalPrice.designGSTPct
      );
      this.userCart.finalPrice.calDiscountedPrintGST = Math.round(
        this.userCart.finalPrice.calPrintPrice *
          this.userCart.finalPrice.printGSTPct
      );
      
    }
  }
  generateOrderId() {
    //debugger;
    this.spinner.show();
    if (this.userCart.finalPrice.calDiscountedTotal == 0) {
      // this.resetCart();
      // this.loadCart();
    }

    let seladd = localStorage.getItem("selectedAddess");
    let addresss = null;
    if (seladd != null && seladd != "") {
      addresss = JSON.parse(seladd);
    }

    let FinalOrder = {
      cart: {},
      orderPrice: {},
      deliveryAddress: addresss == null ? 0 : addresss["addId"],
      userId: localStorage.getItem("userId")
    };
    FinalOrder.cart = this.custService.getLocalStorageCart();
    FinalOrder.orderPrice = this.userCart.finalPrice;

    console.log(JSON.stringify(FinalOrder));
    this.custService.generateOrderIdPost(FinalOrder).subscribe(
      data => {
        this.razorPayOrderId = data[0];
        this.interOrderId = data[1];
        this.spinner.hide();
        //this.payWithRazor(data);
      },
      err => {
        this.spinner.hide();
      }
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
      //debugger;
      console.log(data);
      this.custService.setMeetingSlot(data);
      if (this.userCart.finalPrice.calDiscountedTotal == 0) {
        let timer = setInterval(() => {
          debugger;

          if (this.userCart.finalPrice.calDiscountedTotal > 0) {
            this.generateOrderId();
            clearInterval(timer);
          }

          //this.bookMeeting();
          window.location.reload();
        }, 1000);
      } else {
        this.generateOrderId();
      }

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
      let timer = setInterval(() => {
        debugger;
        alert("Your Meeting Slot is expired.Please choose the New slot");
        clearInterval(timer);
        //this.bookMeeting();
        window.location.reload();
      }, 900000);

      //this.helper.navigateToPath("/revieworder");
    });
  }
  setOrderTimer() {
    var now = new Date().getMinutes();
    var mins = now + 15;
    var setDate = new Date().setMinutes(mins);
    var timerEndTime = new Date(setDate);
    console.log(new Date(setDate));
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
    //debugger;
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
        calDiscount: 0,
        calDiscountedTotal: 0,
        calDiscountedGST: 0,
        calPrintPrice: 0,
        calDesignPrice: 0,
        calDiscountedPrintPrice: 0,
        calDiscountedDesignPrice: 0,
        calDiscountedPrintGST: 0,
        calDiscountedDesignGST: 0,
        printGSTPct: 0,
        designGSTPct: 0
      },
      totalItems: 0
    };
  }
}
