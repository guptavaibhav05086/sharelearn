import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

  getProducts() {
    let url = `${environment.baseUrl}${environment.getProducts}`;
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  checkPincodes(pincode) {
    let url = `${environment.baseUrl}${environment.checkPincodes}`.replace(
      "$pincode",
      pincode
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }

  updateProduct(product) {
    let url = `${environment.baseUrl}${environment.updateProducts}`;
    return this._httpclient.post(url, product, this.login.getAuthHeader());
  }
  updateProductList(product) {
    let url = `${environment.baseUrl}${environment.updateProdList}`;
    return this._httpclient.post(url, product, this.login.getAuthHeader());
  }
  uploadProdImage(file) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.uploadProdImage}`,
      file,
      this.login.getAuthHeader()
    );
  }
  getProflies() {
    let url = `${environment.baseUrl}${environment.getRegisteredprofiles}`;
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  getDiscounts() {
    let url = `${environment.baseUrl}${environment.getDiscounts}`;
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  deleteDiscounts(id) {
    let url = `${environment.baseUrl}${environment.deleteDiscounts}`.replace(
      "$Id",
      id
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  deleteProduct(id) {
    let url = `${environment.baseUrl}${environment.deleteProd}`.replace(
      "$Id",
      id
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  deleteProductList(id) {
    let url = `${environment.baseUrl}${environment.deleteProdList}`.replace(
      "$Id",
      id
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  setDiscounts(discount) {
    let url = `${environment.baseUrl}${environment.updateDiscounts}`;
    return this._httpclient.post(url, discount, this.login.getAuthHeader());
  }
  getDesignerPayout() {
    let url = `${environment.baseUrl}${environment.getDesignerPayoutDetails}`;
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  getPrinterPayout() {
    let url = `${environment.baseUrl}${environment.getPrinterPayoutDetails}`;
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  getAccountDetailsVendor(type, vendorEmail) {
    let url = `${environment.baseUrl}${environment.getAccountDetailsVendor}`
      .replace("$type", type)
      .replace("$vendorEmail", vendorEmail);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  DesignerPaymentVpa(orderId, vendorEmail, amount) {
    debugger;
    let url = `${environment.baseUrl}${environment.designerVpaPay}`
      .replace("$orderId", orderId)
      .replace("$vendorEmail", vendorEmail)
      .replace("$amount", amount);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  PrinterPaymentVpa(orderId, vendorEmail, amount) {
    let url = `${environment.baseUrl}${environment.printerVpaPay}`
      .replace("$orderId", orderId)
      .replace("$vendorEmail", vendorEmail)
      .replace("$amount", amount);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  DesignerPaymentBank(orderId, vendorEmail, amount) {
    debugger;
    let url = `${environment.baseUrl}${environment.designerBankAccountPay}`
      .replace("$orderId", orderId)
      .replace("$vendorEmail", vendorEmail)
      .replace("$amount", amount);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  PrinterPaymentBank(orderId, vendorEmail, amount) {
    let url = `${environment.baseUrl}${environment.printerBankAccountPay}`
      .replace("$orderId", orderId)
      .replace("$vendorEmail", vendorEmail)
      .replace("$amount", amount);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
}
