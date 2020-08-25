import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
import { PrinterProfileRequest } from "../Models/printer-profile-request";
@Injectable({
  providedIn: "root"
})
export class PrinterService {
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

  updateProfileRequest(updateProfile) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.updatePrinter}`,
      updateProfile,
      this.login.getAuthHeader()
    );
  }
  uploadUserImage(file) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.uploadPrinterImage}`,
      file,
      this.login.getAuthHeader()
    );
  }
  getProfile(userId) {
    let url = `${environment.baseUrl}${environment.getPrinterProfile}`.replace(
      "$userId",
      userId
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }

  generateOrderId(amount) {
    let url = `${environment.baseUrl}${environment.generateOrder}`.replace(
      "$amount",
      amount
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  validateTransaction(paymentId, orderId, signature) {
    let url = `${environment.baseUrl}${environment.transactionValidate}`
      .replace("$paymentId", paymentId)
      .replace("$orderId", orderId)
      .replace("$signature", signature);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  fetchNotifications() {
    let url = `${environment.baseUrl}${environment.fetchNotiPrinter}`;
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
}
