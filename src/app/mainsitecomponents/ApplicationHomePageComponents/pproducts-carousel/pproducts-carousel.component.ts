import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { SliderData } from "src/app/Models/slider-data";

@Component({
  selector: "app-pproducts-carousel",
  templateUrl: "./pproducts-carousel.component.html",
  styleUrls: ["./pproducts-carousel.component.css"]
})
export class PproductsCarouselComponent implements OnInit {
  products: any;
  slide2 = 2;
  slide4 = 4;
  images = [];
  displayC = false;
  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    //let data = this.customerService.getproductsData();
    // while (data == undefined) {
    //   data = this.customerService.getproductsData();
    // }
    //this.initiateCarousel(data);
    this.admin.getProducts().subscribe(
      data => {
        debugger;
        this.products = data["products"];
        this.products.map(item => {
          if (item.IsDisabled == false) {
            this.images.push({
              image:
                item.productImage == ""
                  ? "../../../assets/StudentDashboard/img/download.jpg"
                  : item.productImage,
              name: item.value,
              productId: item.key
            });
          }

          this.displayC = true;
        });
        console.log(this.products);
      },
      err => {}
    );
  }

  initiateCarousel(data) {
    this.products = data["products"];
    this.products.map(item => {
      this.images.push({
        image:
          item.productImage == ""
            ? "../../../assets/StudentDashboard/img/download.jpg"
            : item.productImage,
        name: item.value
      });
      this.displayC = true;
    });
    console.log(this.products);
  }
}
