import { Component, OnInit, Inject, HostListener } from "@angular/core";
import {
  state,
  style,
  trigger,
  animate,
  transition
} from "@angular/animations";
import { DOCUMENT } from "@angular/common";
import { AdminService } from "src/app/services/admin.service";
import { CustomerService } from "src/app/services/customer.service";
@Component({
  selector: "app-home-container",
  templateUrl: "./home-container.component.html",
  styleUrls: ["./home-container.component.css"],
  animations: [
    trigger("fade", [
      state("void", style({ opacity: 0 })),
      transition(":enter", [animate(300)]),
      transition(":leave", [animate(500)])
    ])
  ]
})
export class HomeContainerComponent implements OnInit {
  displayTopNav = true;
  constructor(
    @Inject(DOCUMENT) document,
    private adminService: AdminService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    document.getElementsByTagName("body")[0].removeAttribute("style");
    this.adminService.getProducts().subscribe(data => {
      this.customerService.setProductsData(data);
    });
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 400) {
      // //debugger;
      this.displayTopNav = false;
      let element = document.getElementById("navbar");
      let elementTop = document.getElementById("topNav");
      let elementnavbarinner = document.getElementById("searchBarButton");
      elementnavbarinner.classList.remove("topsearchhide");
      // elementnavbarinner.classList.add("productNavMarginTop");

      element.classList.add("sticky");
      elementTop.classList.remove("topNavhide");
      //navbarinner
    } else {
      // //debugger;
      this.displayTopNav = true;
      let element = document.getElementById("navbar");
      let elementTop = document.getElementById("topNav");
      elementTop.classList.add("topNavhide");
      element.classList.remove("sticky");
      let elementnavbarinner = document.getElementById("searchBarButton");
      elementnavbarinner.classList.add("topsearchhide");
      // elementnavbarinner.classList.remove("productNavMarginTop");
    }
  }
}
