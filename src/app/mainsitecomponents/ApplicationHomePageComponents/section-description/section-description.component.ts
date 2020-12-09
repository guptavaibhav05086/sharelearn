import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-section-description",
  templateUrl: "./section-description.component.html",
  styleUrls: ["./section-description.component.css"]
})
export class SectionDescriptionComponent implements OnInit {
  @Input() promotionURL;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    debugger;
    let ele = document
      .getElementsByClassName("modal-content")[0]
      .setAttribute(
        "style",
        "background-color: transparent !important; border: 0px solid rgba(0, 0, 0, 0.2) !important"
      );

    // document
    //   .getElementsByClassName("modal-content")[0]
    //   .classList.add("modal-contentnew");
  }
}
