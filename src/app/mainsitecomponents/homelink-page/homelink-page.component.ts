import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-homelink-page",
  templateUrl: "./homelink-page.component.html",
  styleUrls: ["./homelink-page.component.css"]
})
export class HomelinkPageComponent implements OnInit {
  cordinate = {
    X: 0,
    Y: 0
  };
  constructor() {}

  ngOnInit(): void {}
  imageAreaClick(value) {
    alert(value);
  }
  selectCors(event) {
    this.cordinate.X = event.clientX;
    this.cordinate.Y = event.clientY;
  }
}
