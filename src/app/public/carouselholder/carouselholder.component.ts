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
  slidesData;
  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = false;
  showIndicators = false;
  slidesChangeMessage = "";

  slides = [
    { image: "../../../assets/StudentDashboard/img/download.jpg" }
    // { image: "../../../assets/StudentDashboard/img/download.jpg" },
    // { image: "../../../assets/StudentDashboard/img/download.jpg" },
    // { image: "../../../assets/StudentDashboard/img/download.jpg" },
    // { image: "../../../assets/StudentDashboard/img/download.jpg" },
    // { image: "../../../assets/StudentDashboard/img/download.jpg" },
    // { image: "../../../assets/StudentDashboard/img/download.jpg" },
    // { image: "../../../assets/StudentDashboard/img/download.jpg" },
    // { image: "../../../assets/StudentDashboard/img/download.jpg" }
  ];

  onSlideRangeChange(indexes: number[]): void {
    debugger;
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }
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

  ngOnInit() {
    debugger;
    console.log(this.slidesData);
    console.log(this.slides);
    this.slidesData.forEach(item => {
      let obj = { image: item.image };
      this.slides.push(obj);
    });
  }
}
