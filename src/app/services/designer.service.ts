import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
import { DesignerProfileRequest } from "../Models/designer-profile-request";
import { BankAccountModel } from "../Models/bank-account-model";
@Injectable({
  providedIn: "root"
})
export class DesignerService {
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

  getDesignersNotification() {
    let url = `${environment.baseUrl}${environment.getDesignerNotification}`;
    return this._httpclient.get(url, this.login.getAuthHeader());
  }

  updateProfileRequest(updateProfile: DesignerProfileRequest) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.updateDesigner}`,
      updateProfile,
      this.login.getAuthHeader()
    );
  }
  uploadUserImage(file) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.uploadImage}`,
      file,
      this.login.getAuthHeader()
    );
  }
  uploadFinalSourceImage(file, orderId, type) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.postFinalFilesDesigner}`
        .replace("$orderId", orderId)
        .replace("$type", type),
      file,
      this.login.getAuthHeader()
    );
  }
  fetchNotifications() {
    let url = `${environment.baseUrl}${environment.fetchNotiDesigner}`;
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  downloadOrderFiles(filename) {
    let url = `${environment.baseUrl}${environment.fetchongoingorderfilesDesigner}`.replace(
      "$filename",
      filename
    );
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
  getProfile(userId) {
    let url = `${environment.baseUrl}${environment.getDesignerProfile}`.replace(
      "$userId",
      userId
    );
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  acceptDesignerOrder(email, orderId) {
    let url = `${environment.baseUrl}${environment.acceptDesignerOrder}`
      .replace("$email", email)
      .replace("$orderId", orderId);
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  FetchOngoingDesignerOrder(email, allOrdersflag) {
    debugger;
    let url = `${environment.baseUrl}${environment.fetchOngoingOrdersDesigners}`
      .replace("$email", email)
      .replace("$isAllOrdersRequired", allOrdersflag);
    //isAllOrdersRequired
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
  FetchDesignerDashboard(email) {
    debugger;
    let url = `${environment.baseUrl}${environment.getDesignerDashBoard}`.replace(
      "$email",
      email
    );
    //isAllOrdersRequired
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }

  UpdateBankDetails(model: BankAccountModel) {
    debugger;
    let url = `${environment.baseUrl}${environment.updateBankDetails}`;
    //isAllOrdersRequired
    return this._httpclient.post(url, model, this.login.getAuthHeader());
  }
  GetBankDetails(): Observable<Array<BankAccountModel>> {
    debugger;
    let url = `${environment.baseUrl}${environment.getBankDetails}`;
    //isAllOrdersRequired
    return this._httpclient.get<Array<BankAccountModel>>(
      url,
      this.login.getAuthHeader()
    );
  }
}
