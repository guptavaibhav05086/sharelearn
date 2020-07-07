import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent implements OnInit {
  username;
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem("email");
  }

}
