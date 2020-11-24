import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
@Component({
  selector: "app-section-social-media",
  templateUrl: "./section-social-media.component.html",
  styleUrls: ["./section-social-media.component.css"]
})
export class SectionSocialMediaComponent implements OnInit {
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}

  openLinkSocial(path, e) {
    e.preventDefault();
    //this._helper.navigateToPath("/terms");
    window.open(path, "_blank");
    // let modelRef = this.modalService.open(TermsConditionsComponent);
    // modelRef.componentInstance.type = type;
    // modelRef.result.then(data => {
    //   //debugger;
    //   console.log(data);

    // });
  }
  navigateTopath(path, e) {
    e.preventDefault();

    this.helper.navigateToPath(path);
  }
}
