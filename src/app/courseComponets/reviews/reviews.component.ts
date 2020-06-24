import { Component, OnInit, Input } from "@angular/core";
import { RegisterService } from "../../services/register.service";
import { Feedback } from "src/app/Models/feedback";
import { map } from "rxjs/operators";
@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.css"]
})
export class ReviewsComponent implements OnInit {
  @Input() courseId;
  rating3: number = 0;
  userId = 1;
  feedback: Feedback;
  userFeedbacks: any;
  flags: Array<boolean>;

  constructor(private register: RegisterService) {}
  flag = false;
  message = "";
  ngOnInit(): void {
    this.feedback = new Feedback();
    this.getFeedback();
    this.flags = new Array<boolean>();
    //this.userFeedbacks = new Array<Feedback>();
  }

  submitFeedback() {
    //event.prevantDefault();
    this.feedback.courseId = this.courseId;
    this.feedback.starRating = this.rating3;
    this.feedback.userId = this.userId;
    this.register.registerFeedback(this.feedback).subscribe(
      data => {
        this.flag = true;
        //this.message = "Feedback submitted";
        this.userFeedbacks = data;
        this.feedback.feedback = "";
      },
      err => {
        this.message = "Issue in Feedback submission";
      }
    );
  }
  getFeedback() {
    this.register.getFeedback(this.courseId).subscribe(
      data => {
        debugger;
        console.log(data);
        this.userFeedbacks = data;
        this.userFeedbacks.map((item, index) => {
          item.flag = false;
          this.flags[index] = false;
        });
        console.log(this.userFeedbacks);
      },
      err => {}
    );
  }
  expandComment(e, i) {
    debugger;
    e.preventDefault();
    this.flags[i] = this.flags[i] ? false : true;
  }
}
