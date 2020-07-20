import { Component, OnInit } from "@angular/core";

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
      calFinalTotal: 0
    },
    totalItems:0
  };
  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    debugger;
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    this.userCart.totalItems=cartItems.length;
    if (cartItems != null && cartItems.length > 0) {
      cartItems.forEach(item => {
        if (item.type == "Design And Print") {
          this.userCart.designNprint.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery +=
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
        } else if (item.type == "Design Only") {
          console.log(item.category[0]);
          this.userCart.design.push(item.category[0]);
          this.userCart.finalPrice.calPrice += item.category[0].price.price;
          this.userCart.finalPrice.calGST += item.category[0].price.GST;
          this.userCart.finalPrice.calDelivery +=
            item.category[0].price.deliveryFee;
          this.userCart.finalPrice.calFinalTotal +=
            item.category[0].price.Total;
        } else if (item.type == "Print Only") {
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
    console.log(this.userCart);
  }
}