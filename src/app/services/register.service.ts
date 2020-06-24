import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "../services/login.service";
import { GusetRegister } from "../../app/Models/guset-register";
import { environment } from "src/environments/environment";
import { ResetPassword } from "../Models/reset-password";
@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private _httpclient: HttpClient, private login: LoginService) {}

  guestRegister(register: GusetRegister) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.guestRegister}`,
      register,
      this.login.getAuthHeader()
    );
  }
  registerFeedback(feedback) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.registerFeedback}`,
      feedback,
      this.login.getAuthHeader()
    );
  }
  getFeedback(courseId) {
    let url = `${environment.baseUrl}${environment.getFeedback}`.replace(
      "$courseId",
      courseId
    );
    return this._httpclient.get(url, this.login.getAuthHeader());
  }

  forgotPasswordEmail(email) {
    let url = `${environment.baseUrl}${environment.forgotPassword}`.replace(
      "$email",
      email
    );
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  resetPasswordRequest(resetPassword: ResetPassword) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.resetPassword}`,
      resetPassword,
      this.login.getAuthHeader()
    );
  }
}
