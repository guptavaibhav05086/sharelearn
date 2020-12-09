import { Component, HostListener, Inject } from "@angular/core";

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  ActivatedRoute
} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { AdminService } from "./services/admin.service";
import { CustomerService } from "./services/customer.service";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "mLearnApp";
  loading = false;

  ngOnInit() {}
  @HostListener("document:click", ["$event"])
  handleMenuToggle(event) {
    try {
      //debugger;
      var clickover = event.target;
      var _opened = document
        .getElementById("navbarNavDropdownTop")
        .classList.contains("show");
      if (
        clickover.classList.contains("nav-link") ||
        clickover.classList.contains("navbar-toggler-icon") ||
        clickover.classList.contains("searchBtn")
      ) {
        return;
      }
      if (_opened === true) {
        //document.getElementById(".navbar-toggler").click();
        document
          .getElementById("navbarNavDropdownTop")
          .classList.remove("show");
      }
      // if(clickover.classList.contains('nav-link')){
      //   return;
      // }
      // else{
      //   if (_opened === true) {
      //     //document.getElementById(".navbar-toggler").click();
      //     document
      //     .getElementById("navbarNavDropdownTop")
      //     .classList.remove('show');
      //   }
      // }
    } catch (error) {}
  }

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          //this.spinnerService.show();

          this.loading = true;
          console.log("Navigation Start");

          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          //this.spinnerService.hide();
          //debugger;
          console.log("Navigation End");
          this.loading = false;
          let url = this.router.url.split("?")[0];
          if (url.includes("printers") || url.includes("designer")) {
            this.document
              .getElementById("footer")
              .classList.add("footermargin");
          } else {
            this.document
              .getElementById("footer")
              .classList.remove("footermargin");
          }
          break;
        }
        case event instanceof NavigationStart: {
          break;
        }
      }
    });
  }
}
