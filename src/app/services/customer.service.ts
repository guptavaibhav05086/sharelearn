import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
import { AddressRequest } from "../Models/address-request";
@Injectable({
  providedIn: "root"
})
export class CustomerService {
  item = {
    type: "",
    category: [
      {
        name: "",
        specs: {
          subCategory: "",
          orientation: "",
          size: "",
          paperGSM: "",
          quantity: ""
        },
        meetingDetails: {
          day: "",
          slot: ""
        },
        price: {
          price: 0,
          deliveryFee: 0,
          GST: 0,
          Total: 0
        },
        professionalDesigner: false,
        sourceFile: false
      }
    ]
  };
  itemsList = [];
  discountedPrice;
  cartpriceDetails;
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

  getDiscountPriceDetails(){
    return this.discountedPrice;
  }
  getDiscountPercentage(cartValue){
    let discountPer=0;
    let max=0;
    this.discountedPrice.forEach(element => {
      let cVal=parseFloat(element.CartAmount);
      if(cartValue >= cVal && cVal > max ){
        discountPer=parseFloat( element.DiscountPercentage);
        max=cVal;

      }
    });
    return discountPer;
    //this.dis

  }
  updateAddressRequest(updateAddress) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.addUserAddress}`,
      updateAddress,
      this.login.getAuthHeader()
    );
  }
  getUserAddress(userId): Observable<Array<AddressRequest>> {
    let url = `${environment.baseUrl}${environment.getUserAddress}`.replace(
      "$userId",
      userId
    );
    return this._httpclient.get<Array<AddressRequest>>(
      url,

      this.login.getAuthHeader()
    );
  }
  uploadUserImage(file) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.uploadOrderFiles}`,
      file,
      this.login.getAuthHeader()
    );
  }
  deleteUserAddress(userId, addId): Observable<Array<AddressRequest>> {
    let url = `${environment.baseUrl}${environment.deleteAddress}`
      .replace("$userId", userId)
      .replace("$addId", addId);
    return this._httpclient.get<Array<AddressRequest>>(
      url,

      this.login.getAuthHeader()
    );
  }
  addItemUserOrdersList(item) {
    debugger;
    let existnCart = this.getLocalStorageCart();
    if (existnCart != null && existnCart != undefined) {
      this.itemsList = existnCart;
    }
    this.itemsList.push(item);
    this.updateLocalStorageCart();
  }
  deletItemFromCart(itemId) {
    let existnCart = this.getLocalStorageCart();
    if (existnCart != null && existnCart != undefined) {
      this.itemsList = existnCart.filter(item => item.id != itemId);
    }
    this.updateLocalStorageCart();
  }
  updateLocalStorageCart() {
    localStorage.setItem("cart", JSON.stringify(this.itemsList));
  }
  getLocalStorageCart() {
    let cart = localStorage.getItem("cart");
    if (
      cart != "" &&
      cart != null &&
      cart != undefined &&
      cart != "undefined"
    ) {
      return JSON.parse(cart);
    }
    return null;
  }
  setMeetingSlot(meetingSlot) {
    let existnCart = this.getLocalStorageCart();
    existnCart.forEach(item => {
      item.category[0].meetingDetails.slot = meetingSlot.mSlot;
      item.category[0].meetingDetails.day = meetingSlot.mDate;

    });
    this.itemsList = existnCart;
    console.log(this.itemsList);
    this.updateLocalStorageCart();
  }
  generateOrderId(amount) {
    let url = `${environment.baseUrl}${environment.generateOrderUser}`.replace(
      "$amount",
      amount
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  generateOrderIdPost(orderCart) {
    let url = `${environment.baseUrl}${environment.generateOrderUser}`;
    return this._httpclient.post(
      url,
      orderCart,
      this.login.getAuthHeader()
    );
  }
  validateTransaction(paymentId,orderId,signature){
    let url = `${environment.baseUrl}${environment.transactionValidateUser}`.replace(
      "$paymentId",
      paymentId
    ).replace("$orderId",
    orderId).replace("$signature",
    signature);
    return this._httpclient.get(
      url,
      this.login.getAuthHeader()
    );

  }
}
