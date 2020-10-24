import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { HelperService } from "../../services/helper.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BookMeetingComponent } from "../book-meeting/book-meeting.component";
import { AdminService } from "src/app/services/admin.service";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "src/app/services/login.service";
import { CustomerLoginComponent } from "src/app/auth/customer-login/customer-login.component";
import { CustomerSignUpComponent } from "src/app/auth/customer-sign-up/customer-sign-up.component";

@Component({
  selector: "app-order-cart",
  templateUrl: "./order-cart.component.html",
  styleUrls: ["./order-cart.component.css"]
})
export class OrderCartComponent implements OnInit {
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
  disableProceed: boolean = false;
  constructor(
    private custService: CustomerService,
    private router: Router,
    private modalService: NgbModal,
    private helper: HelperService,
    private admin: AdminService,
    private spinner: NgxSpinnerService,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    let token = this.login.getUserToken();
    //let roe
    if (token.Token == null || token.Token == "" || token.type != "Customer") {
      this.openLogin();
    }
    // else if(){

    // }
    this.admin.getProducts().subscribe(
      data => {
        //this.discountPrice=data["discountList"];
        this.custService.discountedPrice = data["discountList"];
        console.log(this.custService.discountedPrice);
        debugger;
        try {
          this.loadCart();
        } catch (error) {
          this.spinner.hide();
        }

        this.spinner.hide();
        //debugger;
      },
      err => {
        this.spinner.hide();
      }
    );
    // this.loadCart();
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
  openLogin() {
    //event.preventDefault();
    let modelRef = this.modalService.open(CustomerLoginComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.componentInstance.isComingFromCartPage = true;
    modelRef.result.then(data => {
      debugger;
      if (data == "OpenVerify") {
        this.navigateSignUp(true);
      } 
      else if(data == "OpenSignUp"){
        this.navigateSignUp(false);

      }
      else {
        window.location.reload();
      }
    });
  }
  navigateSignUp(flag) {
    let modelRef = this.modalService.open(CustomerSignUpComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.componentInstance.isComingFromCartPage = flag;
    modelRef.result.then(data => {
      debugger;
      if (data == "AccountVerified") {
        window.location.reload();
        //this.placeOrder();
      }
      else if(data=="openLogin"){
        this.openLogin();
      }
      else if(data=="Close"){
        let ver= localStorage.getItem("emailVerificationDone");
        if(ver == "True"){
          window.location.reload();
        }
      }
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
    this.router.navigate(["/createorder"], { queryParams: { itemId: id } });
  }
  createItem() {
    this.router.navigate(["/createorder"]);
  }
  loadCart() {
    debugger;
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
      this.disableProceed = true;
    }
    this.calculateDiscounts();
    console.log("User cart Data");
    console.log(this.userCart);
  }
  calculateDiscounts() {
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
    } else {
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
  placeOrder() {
    let param = null;
    let checkMobileVerification = localStorage.getItem(
      "mobileVerificationDone"
    );
    if (checkMobileVerification == "False") {
      this.navigateSignUp(true);
      return;
    }
    if (
      this.userCart.displayDesignNPrint == true ||
      this.userCart.displayPrint == true
    ) {
      if (
        this.userCart.design.length == 0 &&
        this.userCart.designNprint.length == 0
      ) {
        param = { queryParams: { isPrintOrder: true } };
      } else {
        param = { queryParams: { isPrintOrder: false } };
      }
      this.helper.navigateToPathWithparams("/selectAddress", param);
    } else {
      this.helper.navigateToPath("/revieworder");
    }

    // let modelRef = this.modalService.open(BookMeetingComponent, {
    //   backdrop: "static"
    // });
    // modelRef.result.then(data => {
    //   debugger;
    //   console.log(data);
    //   this.custService.setMeetingSlot(data);
    //   this.helper.navigateToPath("/revieworder");
    // });
  }
  calculatePrintPrice() {}
  calculateDesignPrice() {}
  
}
