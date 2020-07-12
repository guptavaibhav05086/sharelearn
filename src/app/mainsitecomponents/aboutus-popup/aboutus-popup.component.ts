import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-aboutus-popup',
  templateUrl: './aboutus-popup.component.html',
  styleUrls: ['./aboutus-popup.component.css']
})
export class AboutusPopupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
