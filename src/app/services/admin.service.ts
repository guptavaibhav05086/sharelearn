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
    let url = `${environment.baseUrl}${environment.checkPincodes}`.replace('$pincode',pincode);
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
  updateProductList(product){
    let url = `${environment.baseUrl}${environment.updateProdList}`;
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
  getProflies(){
    let url = `${environment.baseUrl}${environment.getRegisteredprofiles}`;
    return this._httpclient.get(
      url,

      this.login.getAuthHeader()
    );
  }
}
