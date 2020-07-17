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
  displayUserNavbar = false;
  displayNavigation = false;
  cordinate = {
    X: 0,
    Y: 0
  };
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
          if (this.router.url == "/") {
            this.displayNavigation = false;
            //this._document.body.classList.add("home");
          } else {
            this.displayNavigation = true;
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

  getStyle(){

    let style ={ 'padding-top': '0px'  }
    if(this.displayNavigation == false){
      return style;
    }
    if(this.displayUserNavbar == true){
     return style={
        'padding-top': '200px'
      }
    }
    else{
     return style={
        'padding-top': '120px'
      }
    }

  }
}
