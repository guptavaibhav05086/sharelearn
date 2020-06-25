import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenResponse } from "../Models/token-response";
import { TokenRequest } from "../Models/token-request";
import { RegisterUser } from "../Models/register-user";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    })
  };
  private headers: HttpHeaders;
  private authHeaders: HttpHeaders;
  private Tokens = {
    Token: "",
    type: "",
    userId: "",
    email: ""
  };
  public static token: string;

  public constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
  }
  getToken(tokenRequest: TokenRequest) {
    debugger;
    let body =
      "username=" +
      tokenRequest.username +
      "&password=" +
      tokenRequest.password +
      "&grant_type=password";
    return this.httpClient.post<TokenResponse>(
      environment.baseUrl + environment.tokenUrl,
      body,
      this.httpOptions
    );
  }
  registerUser(userData: RegisterUser): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseUrl + environment.api_RegisterUser,
      userData
    );
  }
  public setToken(token: TokenResponse) {
    this.Tokens.Token = token.access_token;
    this.Tokens.type = token.role;
    this.Tokens.userId = token.userId;
    this.Tokens.email = token.userName;
    localStorage.setItem("Token", this.Tokens.Token);
    localStorage.setItem("type", this.Tokens.type);
    localStorage.setItem("userId", this.Tokens.userId);
    localStorage.setItem("email", this.Tokens.email);
  }
  public resetToken() {
    localStorage.setItem("Token", "");
    localStorage.setItem("type", "");
  }

  public getUserToken() {
    if (this.Tokens.Token === "") {
      this.Tokens.Token = localStorage.getItem("Token");
      this.Tokens.type = localStorage.getItem("type");
    }
    return this.Tokens;
  }
  public getAuthHeader() {
    if (this.authHeaders == null) {
      this.authHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.Tokens.Token
      });
    }
    const options = {
      headers: this.authHeaders
    };

    return options;
  }
}
