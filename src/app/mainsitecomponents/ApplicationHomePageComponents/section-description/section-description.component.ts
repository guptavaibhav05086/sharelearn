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

  ngOnInit(): void {}
}
