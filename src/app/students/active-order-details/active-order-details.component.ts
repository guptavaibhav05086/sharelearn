import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-active-order-details',
  templateUrl: './active-order-details.component.html',
  styleUrls: ['./active-order-details.component.css']
})
export class ActiveOrderDetailsComponent implements OnInit {
  @Input() data;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
