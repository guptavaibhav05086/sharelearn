import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {

  @Input() data;
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
    console.log(this.data['Industry']);
  }

}
