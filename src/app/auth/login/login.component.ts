import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { LoginService } from "../../services/login.service";
import { RegisterUser } from "../../Models/register-user";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { TokenRequest } from "src/app/Models/token-request";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ForgetpasswordComponent } from "../forgetpassword/forgetpassword.component";
// import { SocialLoginModule, AuthServiceConfig } from "angular-6-social-login";
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider,
//   AuthService
// } from "angular-6-social-login";
import { Socialusers } from "../../Models/socialusers";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.css",
    "../../../assets/DashBoard/css/style.css",
    "../../../assets/DashBoard/css/theme.css"
  ]
})
export class LoginComponent implements OnInit {
  displayLoginError = false;
  loginError = "";
  socialusers = new Socialusers();
  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService,
    private modalService: NgbModal
  ) {}
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ]),
    password: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
      )
    ])
  });
  ngOnInit() {}

  login() {
    let loginRequest = new TokenRequest();
    loginRequest.username = this.loginForm.controls["email"].value;
    loginRequest.password = this.loginForm.controls["password"].value;
    this.spinnerService.show();
    this._login.getToken(loginRequest).subscribe(
      data => {
        //debugger;
        this.spinnerService.hide();
        let verification = data.emailVerified.split(";");
        if (verification[0] != null && verification[0].trim() == "False") {
          localStorage.setItem("unverifiedRole", data.role);
          localStorage.setItem("unverifiedEmail", data.userName);
          localStorage.setItem("unverifiedUserId", data.userId);
          localStorage.setItem("isEmailVerified", verification[0].trim());
          this._helper.navigateToPath("/verifyvendors");
        } else {
          this._login.setToken(data);
          if (data.role == "Designer") {
            this._helper.navigateToPath("/designer/dashboard");
          } else if (data.role == "Printer") {
            this._helper.navigateToPath("/printers/dashboard");
          } else if (data.role == "Admin") {
            this._helper.navigateToPath("/admin/products");
          } else if (data.role == "Support") {
            this._helper.navigateToPath("/admin/products");
          }
        }
      },
      err => {
        this.spinnerService.hide();
        this.displayLoginError = true;
        this.loginError = err.error.error_description;
        console.log(err.error.error_description);
      }
    );
  }
  openForgetPassword() {
    const modalRef = this.modalService.open(ForgetpasswordComponent);
    modalRef.componentInstance.name = "World";
  }
  // public socialSignIn(socialProvider: string) {
  //   //debugger;
  //   let socialPlatformProvider;
  //   if (socialProvider === "facebook") {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialProvider === "google") {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }
  //   this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
  //     console.log(socialProvider, socialusers);
  //     console.log(socialusers);
  //     this.Savesresponse(socialusers);
  //   });
  // }
  Savesresponse(socialusers: Socialusers) {
    // this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
    //   //debugger;
    //   console.log(res);
    //   this.socialusers=res;
    //   this.response = res.userDetail;
    //   localStorage.setItem('socialusers', JSON.stringify( this.socialusers));
    //   console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));
    //   this.router.navigate([`/Dashboard`]);
    // })
  }
}
