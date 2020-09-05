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
  generateOTP(userId, phoneNumber) {
    let url = `${environment.baseUrl}${environment.generateOTP}`
      .replace("$userId", userId)
      .replace("$phoneNumber", phoneNumber);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  verifyOTP(userId, OTP) {
    let url = `${environment.baseUrl}${environment.verifyOTP}`
      .replace("$userId", userId)
      .replace("$OTP", OTP);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  forgotPasswordEmail(email) {
    let url = `${environment.baseUrl}${environment.forgotPassword}`.replace(
      "$email",
      email
    );
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  VerifyEmail(email, guid, role) {
    let url = `${environment.baseUrl}${environment.verifyEmail}`
      .replace("$userId", email)
      .replace("$guid", guid)
      .replace("$role", role);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  resendVerifyEmail(email, guid, role) {
    let url = `${environment.baseUrl}${environment.resendVerifymail}`
      .replace("$email", email)
      .replace("$guid", guid)
      .replace("$role", role);
    return this._httpclient.get(url, this.login.getAuthHeader());
  }
  resetPasswordRequest(resetPassword: ResetPassword) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.resetPassword}`,
      resetPassword,
      this.login.getAuthHeader()
    );
  }
  changePasswordRequest(resetPassword: ResetPassword) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.changePassword}`,
      resetPassword,
      this.login.getAuthHeader()
    );
  }
}
