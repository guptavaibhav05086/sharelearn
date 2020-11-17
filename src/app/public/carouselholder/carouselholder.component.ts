import { Component, OnInit, Input } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { SliderData } from "src/app/Models/slider-data";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductImgesComponent } from "../../public/product-imges/product-imges.component";
@Component({
  selector: "app-carouselholder",
  templateUrl: "./carouselholder.component.html",
  styleUrls: ["./carouselholder.component.css"]
})
export class CarouselholderComponent implements OnInit {
  @Input()
  slidesData;
  @Input() itemsPerSlide = 4;
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
    // //debugger;
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
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // //debugger;

    console.log(this.slidesData);
    console.log(this.slides);
    this.slidesData.forEach(item => {
      let obj = { image: item.image };
      this.slides.push(obj);
    });
  }
  openImageUploads(event, id, name) {
    event.preventDefault();
    debugger;
    var modelRef = this.modalService.open(ProductImgesComponent, {
      size: "lg"
    });
    modelRef.componentInstance.prodId = id;
    modelRef.componentInstance.prodName = name;
  }
}
