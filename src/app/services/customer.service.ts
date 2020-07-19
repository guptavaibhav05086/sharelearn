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
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

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
  deletItemFromCart(itemId) {}
  updateLocalStorageCart() {
    localStorage.setItem("cart", JSON.stringify(this.itemsList));
  }
  getLocalStorageCart() {
    let cart = localStorage.getItem("cart");
    if (cart != "" && cart != null && cart != undefined) {
      return JSON.parse(cart);
    }
    return null;
  }
}
