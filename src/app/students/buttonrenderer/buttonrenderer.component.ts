import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {ActiveOrderDetailsComponent } from "../active-order-details/active-order-details.component";
@Component({
  selector: 'app-buttonrenderer',
  templateUrl: './buttonrenderer.component.html',
  styleUrls: ['./buttonrenderer.component.css']
})
export class ButtonrendererComponent implements OnInit{
  data:any;
  params:any;
  
  constructor(private modalService: NgbModal) {}

  agInit(params){
    this.data=params.value;
    this.params=params;
  }

  ngOnInit(): void {
    
  }
  execute(){
    let modelref=this.modalService.open(ActiveOrderDetailsComponent, {
      centered: true
     });
     modelref.componentInstance.data=this.params.data;
  }
 
}

