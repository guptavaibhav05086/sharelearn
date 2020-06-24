import { Component, OnInit, Input } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { SliderData } from "src/app/Models/slider-data";
@Component({
  selector: "app-carouselholder",
  templateUrl: "./carouselholder.component.html",
  styleUrls: ["./carouselholder.component.css"]
})
export class CarouselholderComponent implements OnInit {
  @Input()
  slidesData: Array<SliderData>;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 50,
    margin: 10,
    autoplay: true,
    autoplaySpeed: 20,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  };
  constructor() {}

  ngOnInit() {}
}
