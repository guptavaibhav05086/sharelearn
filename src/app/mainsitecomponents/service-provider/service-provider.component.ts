import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-service-provider",
  templateUrl: "./service-provider.component.html",
  styleUrls: ["./service-provider.component.css"]
})
export class ServiceProviderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    document.getElementsByTagName("body")[0].removeAttribute("style");
    let element = document.getElementById("signupsec");
    this.scrollToElement(element);
  }
  scrollToElement($element): void {
    if ($element == null) {
      $element = document.getElementById("signupsec");
    }

    $element.scrollIntoView({
      block: "start"
    });
    // $element.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    //   inline: "nearest"
    // });
  }
}
