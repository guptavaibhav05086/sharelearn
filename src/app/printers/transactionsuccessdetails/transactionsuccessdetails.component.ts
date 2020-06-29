import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-transactionsuccessdetails',
  templateUrl: './transactionsuccessdetails.component.html',
  styleUrls: ['./transactionsuccessdetails.component.css']
})
export class TransactionsuccessdetailsComponent implements OnInit {
@Input() transactionId;
@Input() transactionStatus;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
