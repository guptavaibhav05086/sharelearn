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
}
