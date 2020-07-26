import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-print-rates",
  templateUrl: "./print-rates.component.html",
  styleUrls: ["./print-rates.component.css"]
})
export class PrintRatesComponent implements OnInit {
  @Input() qunatities;
  @Input() printPrice;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
