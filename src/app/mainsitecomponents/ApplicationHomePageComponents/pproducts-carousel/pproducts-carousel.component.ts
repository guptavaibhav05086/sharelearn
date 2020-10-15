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

  images = [];
  displayC = false;
  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getProducts().subscribe(
      data => {
        //debugger;
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
      },
      err => {}
    );
  }
}
