import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailsComponentComponent } from "../details-component/details-component.component"

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  userList = [
    {
      ProductSubcategory : "A" ,
      Industry : "A",
      MeetingSlot : "A ",
      Amount : "1"
    },
    {
      ProductSubcategory : "B" ,
      Industry : "B",
      MeetingSlot : "B",
      Amount : "2"
    },
    {
      ProductSubcategory : "C" ,
      Industry : "C",
      MeetingSlot : "C",
      Amount : "3"
    }];
  constructor( private modalService: NgbModal) { }
  
  ngOnInit(): void {
  }
  openModal(user) {
    debugger;
    let modelref=this.modalService.open(DetailsComponentComponent, {
     centered: true
    });
    modelref.componentInstance.data=user;
}
onSubmit() {
  this.modalService.dismissAll();
 
 }
}