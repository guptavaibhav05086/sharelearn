import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-section-product-description",
  templateUrl: "./section-product-description.component.html",
  styleUrls: ["./section-product-description.component.css"]
})
export class SectionProductDescriptionComponent implements OnInit {
  imgUrl = "../../../../assets/HomePageImg/3.jpg";
  constructor() {}

  ngOnInit(): void {}
}
