import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
import { PrinterProfileRequest } from "../Models/printer-profile-request";
import { BankAccountModel } from "../Models/bank-account-model";
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
  trackDelivery(taskId) {
    let url = `${environment.baseUrl}${environment.trackDelivery}`.replace(
      "$taskId",
      taskId    );
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
  FetchDashboard(email) {
    debugger;
    let url = `${environment.baseUrl}${environment.getPrinterDashboard}`.replace(
      "$email",
      email
    );
    //isAllOrdersRequired
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  FetchOngoingOrder(email, allOrdersflag) {
    debugger;
    let url = `${environment.baseUrl}${environment.fetchOngoingOrdersPrinter}`
      .replace("$email", email)
      .replace("$isAllOrdersRequired", allOrdersflag);
    //isAllOrdersRequired
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  acceptPrintOrder(email, orderId) {
    let url = `${environment.baseUrl}${environment.acceptPrintOrder}`
      .replace("$email", email)
      .replace("$orderId", orderId);
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  uploadFinalInvoice(file, orderId) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.postPrinterInvoice}`.replace(
        "$orderId",
        orderId
      ),
      file,
      this.login.getAuthHeader()
    );
  }
  downloadOrderFiles(filename, type) {
    let url = `${environment.baseUrl}${environment.fetchongoingorderfilesPrinter}`
      .replace("$filename", filename)
      .replace("$type", type);
    let authHeaders = new HttpHeaders({
      Authorization: "Bearer " + this.login.getUserToken().Token
    });

    const options = {
      headers: authHeaders,
      responseType: "blob" as "json"
    };
    return this._httpclient.get(
      url,

      options
    );
  }
  UpdateBankDetails(model: BankAccountModel) {
    debugger;
    let url = `${environment.baseUrl}${environment.updateBankDetailsPrinter}`;
    //isAllOrdersRequired
    return this._httpclient.post(url, model, this.login.getAuthHeader());
  }
  GetBankDetails(): Observable<Array<BankAccountModel>> {
    debugger;
    let url = `${environment.baseUrl}${environment.getPrinterBankDetails}`;
    //isAllOrdersRequired
    return this._httpclient.get<Array<BankAccountModel>>(
      url,
      this.login.getAuthHeader()
    );
  }
  initiateDelivery(orderId,customerId){
    let url = `${environment.baseUrl}${environment.initiateDelivery}`
      .replace("$orderId", orderId)
      .replace("$customerId", customerId);
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
}
