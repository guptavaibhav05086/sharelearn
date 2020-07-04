import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
import { DesignerProfileRequest } from "../Models/designer-profile-request";
@Injectable({
  providedIn: "root"
})
export class DesignerService {
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

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
}
