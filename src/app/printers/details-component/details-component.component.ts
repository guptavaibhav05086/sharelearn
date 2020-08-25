import { Component, OnInit ,Input} from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {
  @Input() data;
  totalamount=0;
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
    //this.totaling();
  }
  // totaling(){
  //   this.data.forEach(element => {
  //     this.totalamount += element["Amount"]; 
  //   });
  // }
}
