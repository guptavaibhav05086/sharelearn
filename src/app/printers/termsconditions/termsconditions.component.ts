import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-termsconditions",
  templateUrl: "./termsconditions.component.html",
  styleUrls: ["./termsconditions.component.css"]
})
export class TermsconditionsComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
