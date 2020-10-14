import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { HelperService } from "src/app/services/helper.service";
import { CustomerService } from "src/app/services/customer.service";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerLoginComponent } from "../../../auth/customer-login/customer-login.component";
import { CustomerSignUpComponent } from "../../../auth/customer-sign-up/customer-sign-up.component";
import { debug } from "util";

@Component({
  selector: "app-section-top-nav",
  templateUrl: "./section-top-nav.component.html",
  styleUrls: ["./section-top-nav.component.css"]
})
export class SectionTopNavComponent implements OnInit {
  @Output() componentLoaded = new EventEmitter<boolean>();
  username = "";
  displayUserNav = false;
  constructor(
    private login: LoginService,
    private helper: HelperService,
    private modalService: NgbModal,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    //debugger;
    this.componentLoaded.emit(true);
    let token = this.login.getUserToken();
    if (token.Token == null || token.Token == "") {
      this.displayUserNav = false;
    } else {
      this.displayUserNav = true;
      this.username = localStorage.getItem("email");
    }
  }
  navigateSignUp(validation) {
    let modelRef = this.modalService.open(CustomerSignUpComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.componentInstance.verifyUser = validation;
    modelRef.componentInstance.isCustomerSignUpButton = !validation;
   modelRef.componentInstance.isComingFromCartPage=false;
  }
  navigateprofile(event) {
    //debugger;
    event.preventDefault();
    let token = this.login.getUserToken();
    if (token == null) {
      this.displayUserNav = false;
      return;
    }
    if (token.type == "Printer") {
      this.helper.navigateToPath("/printers/profile");
    }
    if (token.type == "Designer") {
      this.helper.navigateToPath("/designer/designerprofile");
    }
  }
  openLogin(event) {
    event.preventDefault();
    let modelRef = this.modalService.open(CustomerLoginComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.result.then(data => {
      debugger;
      if (data == "OpenVerify") {
        this.navigateSignUp(true);
      } else {
        //this.helper.navigateToPath("/homePage");
        window.location.reload();
      }
    });
  }
  openRegister(event) {
    // let modelRef = this.modalService.open(LoginComponent, {
    //   backdrop: "static",
    //   keyboard: false
    // });
  }
  googleLogin(event) {
    event.preventDefault();
    debugger;
    this.customerService.getExternalLogins().subscribe(data => {
      console.log(data);
      let url = data[0];
      // window.location = url["Url"].replace(
      //   "redirect_uri=http%3A%2F%2Flocalhost%3A39117%2F",
      //   "redirect_uri=http%3A%2F%2Flocalhost%3A4200%2FhomePage"
      // );
      this.customerService.initiateGoogleLogin(
        url["Url"].replace(
          "redirect_uri=http%3A%2F%2Flocalhost%3A39117%2F",
          "redirect_uri=http%3A%2F%2Flocalhost%3A4200%2FhomePage"
        )
      );
      // this.customerService.initiateGoogleLogin(url["Url"]).subscribe(
      //   data => console.log(data),
      //   err => console.log(data)
      // );
    });
  }
  stopEvent(event) {
    event.preventDefault();
  }
}
