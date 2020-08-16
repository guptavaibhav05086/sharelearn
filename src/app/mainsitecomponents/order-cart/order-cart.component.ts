import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { HelperService } from "../../services/helper.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BookMeetingComponent } from "../book-meeting/book-meeting.component";
import { AdminService } from "src/app/services/admin.service";
import { NgxSpinnerService } from "ngx-spinner";

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
      calDiscountedTotal: 0
    },
    totalItems: 0
  };
  constructor(
    private custService: CustomerService,
    private router: Router,
    private modalService: NgbModal,
    private helper: HelperService,
    private admin: AdminService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
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
        calDiscountedTotal: 0
      },
      totalItems: 0
    };
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
  loadCart() {
    debugger;
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    this.userCart.totalItems = cartItems.length;
    if (cartItems != null && cartItems.length > 0) {
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
        } else if (item.type == "Print Only") {
          item.category[0].id = item.id;
          this.userCart.print.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery =
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
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
    }
    this.calculateDiscounts();
    console.log(this.userCart);
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
  placeOrder() {
    if(this.userCart.displayDesignNPrint == true || this.userCart.displayPrint == true){
      this.helper.navigateToPath("/selectAddress");
    }
    else{
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
}
