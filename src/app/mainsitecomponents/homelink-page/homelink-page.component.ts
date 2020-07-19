import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import { WindowRefService } from "src/app/services/window-ref.service";
import { HelperService } from "../../services/helper.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-homelink-page",
  templateUrl: "./homelink-page.component.html",
  styleUrls: ["./homelink-page.component.css"]
})
export class HomelinkPageComponent implements OnInit {
  winSize = {
    oWidth: "",
    oHeigth: "",
    nWidth: "",
    nHeigth: ""
  };
  homepageImgUrl = "../../../assets/img/homepageimg.png";
  homePageMobileUrl = "../../../assets/img/homemob.png";
  imgUrl = "";
  cords;
  cordinate = {
    X: 0,
    Y: 0
  };
  constructor(
    private winRef: WindowRefService,
    private helper: HelperService,
    @Inject(DOCUMENT) private _document
  ) {}

  ngOnInit(): void {
    this.selectCors();
  }

  socialLink(name) {
    if (name == "fb") {
      window.open("https://www.facebook.com/shapenprint/", "_blank");
    }
    if (name == "in") {
      window.open("https://www.instagram.com/shapenprint/", "_blank");
    }
    if (name == "ln") {
      window.open("https://www.linkedin.com/company/shapenprint/", "_blank");
    }
    if (name == "tw") {
      window.open("https://twitter.com/shapeNprint/", "_blank");
    }
    if (name == "register") {
      this.helper.navigateToPath("/register");
    }
  }

  @HostListener("window:load")
  calculateCordsOnload() {
    this.winSize.nWidth = this.winRef.nativeWindow.visualViewport.width + "px";
    this.winSize.nHeigth =
      this.winRef.nativeWindow.visualViewport.height + "px";
    console.log(this.winSize);
    if (this.winRef.nativeWindow.visualViewport.width < 768) {
      this.imgUrl = this.homePageMobileUrl;
    } else {
      this.imgUrl = this.homepageImgUrl;
    }
    //alert("w: " + this.winSize.nWidth + " h: " + this.winSize.nHeigth);
  }
  @HostListener("window:resize")
  calculateCordsOnresize() {
    this.winSize.nWidth = this.winRef.nativeWindow.visualViewport.width + "px";
    this.winSize.nHeigth =
      this.winRef.nativeWindow.visualViewport.height + "px";
    console.log(this.winSize);
    if (this.winRef.nativeWindow.visualViewport.width < 768) {
      this.imgUrl = this.homePageMobileUrl;
    } else {
      this.imgUrl = this.homepageImgUrl;
    }
    //alert("w: " + this.winSize.nWidth + " h: " + this.winSize.nHeigth);
  }

  selectCors() {
    this.winSize.nWidth = this.winRef.nativeWindow.visualViewport.width + "px";
    this.winSize.nHeigth =
      this.winRef.nativeWindow.visualViewport.height + "px";
    console.log(this.winSize);
    if (this.winRef.nativeWindow.visualViewport.width < 768) {
      this.imgUrl = this.homePageMobileUrl;
    } else {
      this.imgUrl = this.homepageImgUrl;
    }
    // alert(this.cordinate);
  }
  clickCord(event) {
    this.cordinate.X = event.clientX;
    this.cordinate.Y = event.clientY;
    if (this.cordinate.Y > 363 && this.cordinate.Y < 385) {
      if (this.cordinate.X > 1270 && this.cordinate.X < 1290) {
        alert("Linkdn Clicked");
        window.open("https://www.linkedin.com/company/shapenprint/", "_blank");
      } else if (this.cordinate.X > 1305 && this.cordinate.X < 1325) {
        //alert("Insta Clicked");
        window.open("https://www.instagram.com/shapenprint/", "_blank");
      } else if (this.cordinate.X > 1345 && this.cordinate.X < 1365) {
        //alert("Twitter Clicked");
        window.open("https://twitter.com/shapeNprint/", "_blank");
      } else if (this.cordinate.X > 1375 && this.cordinate.X < 1395) {
        //alert("Facebook Clicked");
        window.open("https://www.facebook.com/shapenprint/", "_blank");
      }
    }
    console.log(this.cordinate);
    var cord = "X: " + this.cordinate.X + " Y: " + this.cordinate.Y;
    alert(cord);
  }
}
