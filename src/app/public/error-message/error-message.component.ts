import { Component, OnInit } from "@angular/core";
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: "app-error-message",
  templateUrl: "./error-message.component.html",
  styleUrls: ["./error-message.component.css"]
})
export class ErrorMessageComponent implements OnInit {
  constructor(private register:RegisterService) {}

  ngOnInit(): void {}

  resendVerifyLink(){
    let role = localStorage.getItem("unverifiedRole");
       let email=   localStorage.getItem("unverifiedEmail");
        let id=   localStorage.getItem("unverifiedUserId");
        this.register.resendVerifyEmail(email,id,role).subscribe(data=>{
          alert('Mail send successfully.Please check your email id');
        },err=>{
          alert('Issue in sending verification mail.Contact customer support Team');
        });

  }
}
