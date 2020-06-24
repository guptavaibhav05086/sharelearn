import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-testforms',
  templateUrl: './testforms.component.html',
  styleUrls: ['./testforms.component.css']
})
export class TestformsComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required
     
    ]),
    password: new FormControl("", [
      Validators.required,
     
    ])
  });
  constructor() { }

  ngOnInit(): void {
  }

}
