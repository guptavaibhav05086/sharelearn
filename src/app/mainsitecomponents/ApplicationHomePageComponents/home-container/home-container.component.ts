import { Component, OnInit, Inject, HostListener } from "@angular/core";
import {
  state,
  style,
  trigger,
  animate,
  transition
} from "@angular/animations";
import { DOCUMENT } from "@angular/common";
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
  constructor(@Inject(DOCUMENT) document) {}

  ngOnInit(): void {}
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 550) {
      debugger;
      let element = document.getElementById("navbar");
      let elementTop = document.getElementById("topNav");
      let elementnavbarinner = document.getElementById("searchBarButton");
      elementnavbarinner.classList.remove("topsearchhide");
      // elementnavbarinner.classList.add("productNavMarginTop");

      element.classList.add("sticky");
      elementTop.classList.remove("topNavhide");
      //navbarinner
    } else {
      debugger;
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
