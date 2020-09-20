import { Component, OnInit, Inject, HostListener } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { DOCUMENT } from "@angular/common";
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
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  displayTopNav = false;
  displayUserNavbar = false;
  displayNavigation = false;
  cordinate = {
    X: 0,
    Y: 0
  };
  topNavLoaded(value){
    debugger;
    if(value==true){
         let elementnavbarinner = document.getElementById("searchBarButton");
      elementnavbarinner.classList.remove("topsearchhide");
    }

  }
  constructor(
    private login: LoginService,
    private router: Router,
    @Inject(DOCUMENT) private _document
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          debugger;
          console.log(this.router.url);
          let token = localStorage.getItem("Token");
          if (token == "" || token == null) {
            this.displayUserNavbar = false;
          } else {
            this.displayUserNavbar = true;
          }

          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          console.log("Navigation End");
          console.log(this.router.url);
          if (this.router.url == "/" || this.router.url == "/homePage") {
            this.displayNavigation = false;
            this.displayTopNav = false;
            //this._document.body.classList.add("home");
          } else {
            debugger;
            this.displayNavigation = true;
            this.displayTopNav = true;
            
            //this._document.body.classList.remove("home");
          }
          break;
        }
        case event instanceof NavigationStart: {
          break;
        }
      }
    });
  }

  calculateCords(event) {
    this.cordinate.X = event.clientX;
    this.cordinate.Y = event.clientY;
    console.log(this.cordinate);
  }
  onClickBody() {}
  ngOnInit() {
    debugger;
    let userLogin = this.login.getUserToken();
    if (userLogin.Token != null && userLogin.Token != "") {
      this.displayUserNavbar = true;
    }
  }

  getStyle() {
    let style = { "padding-top": "0px" };
    if (this.displayNavigation == false) {
      return style;
    }
    if (this.displayUserNavbar == true) {
      return (style = {
        "padding-top": "200px"
      });
    } else {
      return (style = {
        "padding-top": "120px"
      });
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    // if (window.pageYOffset > 200) {
    //   debugger;
    //   this.displayTopNav = false;
    //   let element = document.getElementById("navbar");
    //   let elementTop = document.getElementById("topNav");
    //   let elementnavbarinner = document.getElementById("searchBarButton");
    //   elementnavbarinner.classList.remove("topsearchhide");
    //   // elementnavbarinner.classList.add("productNavMarginTop");
    //   element.classList.add("sticky");
    //   elementTop.classList.remove("topNavhide");
    //   //navbarinner
    // } else {
    //   debugger;
    //   this.displayTopNav = true;
    //   let element = document.getElementById("navbar");
    //   let elementTop = document.getElementById("topNav");
    //   elementTop.classList.add("topNavhide");
    //   element.classList.remove("sticky");
    //   let elementnavbarinner = document.getElementById("searchBarButton");
    //   elementnavbarinner.classList.add("topsearchhide");
    //   // elementnavbarinner.classList.remove("productNavMarginTop");
    // }
  }
}
