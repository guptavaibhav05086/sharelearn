import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topnavuserlogin',
  templateUrl: './topnavuserlogin.component.html',
  styleUrls: ['./topnavuserlogin.component.css']
})
export class TopnavuserloginComponent implements OnInit {
  username;
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem("email");
  }

}
