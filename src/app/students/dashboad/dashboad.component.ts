import { Component, OnInit } from '@angular/core';
import {DesignerService } from '../../services/designer.service'
@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.css']
})
export class DashboadComponent implements OnInit {
  dashboardData:any;
  constructor(private service:DesignerService) { }

  ngOnInit() {
    let email=localStorage.getItem("email");
    this.service.FetchDesignerDashboard(email).subscribe(data=>{
      console.log(data);
      this.dashboardData=data;

    },err=>{
      console.log(err);
    })

  }

}
