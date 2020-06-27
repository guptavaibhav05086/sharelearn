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
}
