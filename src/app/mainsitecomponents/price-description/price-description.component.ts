import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-price-description',
  templateUrl: './price-description.component.html',
  styleUrls: ['./price-description.component.css']
})
export class PriceDescriptionComponent implements OnInit {
  @Input() orderPrice;
  @Input()disDesig;
  @Input() disPrinter;

  // orderPrice = {
  //   price: 0,
  //   deliveryFee: 0,
  //   GST: 0,
  //   Total: 0,
  //   designCost: 0,
  //   printCost: 0,
  //   designGST: 0,
  //   printGST: 0,
  //   totalDesignCost: 0,
  //   totalPrintCost: 0,
  //   deliveryDays: 0,
  //   professiondesignerFees: 0,
  //   sourceFileFees: 0
  // };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
