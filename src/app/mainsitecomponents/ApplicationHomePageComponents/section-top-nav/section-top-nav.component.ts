import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { HelperService } from "src/app/services/helper.service";
import { CustomerService } from "src/app/services/customer.service";
import { AdminService } from "src/app/services/admin.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerLoginComponent } from "../../../auth/customer-login/customer-login.component";
import { CustomerSignUpComponent } from "../../../auth/customer-sign-up/customer-sign-up.component";
import { debug } from "util";

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  ActivatedRoute
} from "@angular/router";

@Component({
  selector: "app-section-top-nav",
  templateUrl: "./section-top-nav.component.html",
  styleUrls: ["./section-top-nav.component.css"]
})
export class SectionTopNavComponent implements OnInit {
  @Output() componentLoaded = new EventEmitter<boolean>();
  username = "";
  displayUserNav = false;
  selected: string;
  products: Array<any> = new Array<any>();
  dproducts: Array<any> = new Array<any>();
  productsdata: any;
  constructor(
    private login: LoginService,
    private helper: HelperService,
    private modalService: NgbModal,
    private customerService: CustomerService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.selected = "";

          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          //this.spinnerService.hide();
          //debugger;

          break;
        }
        case event instanceof NavigationStart: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    //debugger;
    this.componentLoaded.emit(true);
    let token = this.login.getUserToken();
    if (token.Token == null || token.Token == "" || token.type != "Customer") {
      this.displayUserNav = false;
    } else {
      this.displayUserNav = true;
      this.username = localStorage.getItem("email");
    }
    this.adminService.getProducts().subscribe(data => {
      //debugger;
      this.productsdata = data;
      data["products"].forEach(element => {
        let item = {
          pName: element.value,
          pSub: null,
          displayN: element.value
        };
        if (element.IsDisabled == false) {
          this.products.push(element.value.trim());
        }
      });
      data["productList"].forEach(element => {
        let item = {
          pName: element.value,
          pSub: element.productSubcategory,
          displayN: element.productSubcategory
        };
        if (element.IsDisabled == false) {
          this.products.push(element.productSubcategory.trim());
        }
      });
      this.dproducts = [...new Set(this.products)];
    });
  }

  navigateSignUp(validation) {
    let modelRef = this.modalService.open(CustomerSignUpComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.componentInstance.verifyUser = validation;
    modelRef.componentInstance.isCustomerSignUpButton = !validation;
    modelRef.componentInstance.isComingFromCartPage = false;

    modelRef.result.then(data => {
      if (data == "openLogin") {
        this.openLogin(null);
      }
    });
  }
  navigateprofile(event) {
    ////debugger;
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
    if (event != null) {
      event.preventDefault();
    }

    let modelRef = this.modalService.open(CustomerLoginComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.result.then(data => {
      //debugger;
      if (data == "OpenVerify") {
        this.navigateSignUp(true);
      } else if (data == "OpenSignUp") {
        this.navigateSignUp(false);
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
  toggleClass(flag) {
    //debugger;
    let element = document.getElementById("navbar");
    if (flag) {
      element.classList.remove("nav-bar-two");
      element.classList.add("nav-bar-two-2");
    } else {
      element.classList.remove("nav-bar-two-2");
      element.classList.add("nav-bar-two");
    }
  }
  toggleClassLogin() {
    //debugger;
    let element = document.getElementById("navbar");
    let value = document
      .getElementById("navbarDropdownMenuLink")
      .getAttribute("aria-expanded");
    if (value == "false") {
      element.classList.remove("nav-bar-two");
      element.classList.add("nav-bar-two-2");
    } else if (value == "true") {
      element.classList.remove("nav-bar-two-2");
      element.classList.add("nav-bar-two");
    }
  }
  googleLogin(event) {
    event.preventDefault();
    //debugger;
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
  NavigateToOrder() {
    let params = { selectedProduct: null, selSubCat: null };
    let filteredData = this.productsdata["productList"].filter(
      item => item.productSubcategory == this.selected
    );
    if (filteredData.length > 0) {
      params.selSubCat = filteredData[0].productSubcategory;
      params.selectedProduct = filteredData[0].productName;
    } else {
      params.selectedProduct = this.selected;
    }
    let param = { queryParams: params };
    //this.selected = "";
    this.helper.navigateToPathWithparams("/createorder", param);
  }
  navigateToProduct(prodName, e) {
    e.preventDefault();
    let params = { selectedProduct: prodName };
    this.helper.navigateToPathWithparams("/createorder", {
      queryParams: params
    });
  }
}
