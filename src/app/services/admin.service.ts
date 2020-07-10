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

  updateProduct(product){
    let url = `${environment.baseUrl}${environment.updateProducts}`;
    return this._httpclient.post(
      url,
      product,
      this.login.getAuthHeader()
    );
  }
  uploadProdImage(file) {
    return this._httpclient.post(
      `${environment.baseUrl}${environment.uploadProdImage}`,
      file,
      this.login.getAuthHeader()
    );
  }
}
