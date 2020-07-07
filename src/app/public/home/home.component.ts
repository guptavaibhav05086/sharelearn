import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
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
  constructor(private login: LoginService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          debugger;
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

          break;
        }
        case event instanceof NavigationStart: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    debugger;
    let userLogin = this.login.getUserToken();
    if (userLogin.Token != null && userLogin.Token != "") {
      this.displayUserNavbar = true;
    }
  }
}
