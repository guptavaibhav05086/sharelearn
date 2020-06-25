import { Injectable } from "@angular/core";
import { CourseList } from "../Models/course-list";
import { TopicList } from "../Models/topic-list";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cities } from "../Models/cities";
@Injectable({
  providedIn: "root"
})
export class HelperService {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpclient: HttpClient
  ) {}

  getCourseList(): Array<CourseList> {
    let courseList: CourseList[] = [
      {
        courseId: 1,
        courseName: "React",
        imageName: "React.png",
        courseFees: 18500
      },
      {
        courseId: 2,
        courseName: "Angular 8",
        imageName: "Angular.png",
        courseFees: 20000
      },
      {
        courseId: 3,
        courseName: "Node",
        imageName: "Node.png",
        courseFees: 20000
      },
      {
        courseId: 4,
        courseName: "C#/.Net",
        imageName: "DotNet.png",
        courseFees: 20000
      },
      {
        courseId: 5,
        courseName: "Java",
        imageName: "Java.jpg",
        courseFees: 20000
      },
      {
        courseId: 6,
        courseName: "Java Script",
        imageName: "JS.jpg",
        courseFees: 6000
      },
      {
        courseId: 7,
        courseName: "MEAN",
        imageName: "mean.jpg",
        courseFees: 35000
      },
      {
        courseId: 8,
        courseName: "MERN",
        imageName: "mern.png",
        courseFees: 35000
      }
    ];

    return courseList;
  }
  getTopicList(): Array<TopicList> {
    let courseList: TopicList[] = [
      {
        courseId: 1,
        topicName: " Introduction to Front End Development and React ",
        topicId: 1,
        fees: 1500
      },
      {
        courseId: 1,
        topicName: " Introduction to Components, State and Props ",
        topicId: 2,
        fees: 2000
      },
      {
        courseId: 1,
        topicName: " React Forms, Events, Component Styling ",
        topicId: 3,
        fees: 2500
      },
      {
        courseId: 1,
        topicName: " React API calls, Security architecture ,Axios ",
        topicId: 4,
        fees: 2500
      },
      {
        courseId: 1,
        topicName: " React Navigation, Routing, Securing Routes ",
        topicId: 5,
        fees: 3000
      },
      {
        courseId: 1,
        topicName: " React State Management using Redux and Thunk ",
        topicId: 6,
        fees: 4000
      },
      { courseId: 1, topicName: " React Hooks", topicId: 7, fees: 3000 },
      {
        courseId: 1,
        topicName:
          " React Application Unit Testing and Deployment on Firebase ",
        topicId: 8,
        fees: 2000
      },
      {
        courseId: 1,
        topicName: "Any Custom Topic/Particular issue Support ",
        topicId: 9,
        fees: 0
      },
      {
        courseId: 2,
        topicName: "TypeScript",
        topicId: 1,
        fees: 2500
      },
      {
        courseId: 2,
        topicName: "Introduction to Angular",
        topicId: 2,
        fees: 2000
      },
      {
        courseId: 2,
        topicName: "Angular Components and Data Binding",
        topicId: 3,
        fees: 2500
      },
      {
        courseId: 2,
        topicName: "Directives and Pipes in Angular",
        topicId: 4,
        fees: 2500
      },
      {
        courseId: 2,
        topicName: "Angular Services and Dependency Injection",
        topicId: 5,
        fees: 2000
      },
      {
        courseId: 2,
        topicName: "Angular Routes and Navigation",
        topicId: 6,
        fees: 2500
      },
      {
        courseId: 2,
        topicName: " Angular Form Creation and Validation",
        topicId: 7,
        fees: 4000
      },
      {
        courseId: 2,
        topicName: "API Calls and JWT Authentication in Angular",
        topicId: 8,
        fees: 2500
      },
      {
        courseId: 2,
        topicName: "Unit Testing and Deployment on Firebase",
        topicId: 9,
        fees: 2000
      },
      {
        courseId: 2,
        topicName: " Any Custom Topic/Particular issue Support",
        topicId: 10,
        fees: 0
      },
      {
        courseId: 3,
        topicName: "TypeScript",
        topicId: 1,
        fees: 2500
      },
      {
        courseId: 3,
        topicName: "Introduction to Node.js",
        topicId: 2,
        fees: 1500
      },
      {
        courseId: 3,
        topicName: "File System Module and Express.js",
        topicId: 3,
        fees: 2500
      },
      {
        courseId: 3,
        topicName: "Asynchronous Programming",
        topicId: 4,
        fees: 2500
      },
      {
        courseId: 3,
        topicName: "Integration with MongoDB and Email Servers",
        topicId: 5,
        fees: 2000
      },
      {
        courseId: 3,
        topicName: "REST APIs",
        topicId: 6,
        fees: 2500
      },
      {
        courseId: 3,
        topicName: "User Authentication and Application Security",
        topicId: 7,
        fees: 4000
      },
      {
        courseId: 3,
        topicName: " Testing Node.js Applications ",
        topicId: 8,
        fees: 2500
      },
      {
        courseId: 3,
        topicName: "Microservices Application",
        topicId: 9,
        fees: 2000
      },
      {
        courseId: 3,
        topicName: " Any Custom Topic/Particular issue Support",
        topicId: 10,
        fees: 0
      },
      {
        courseId: 5,
        topicName: " Web Development Basics and Tools",
        topicId: 1,
        fees: 1500
      },
      {
        courseId: 5,
        topicName: " Programming basics ",
        topicId: 2,
        fees: 2500
      },
      {
        courseId: 5,
        topicName: "OOPs and Design Pattern ",
        topicId: 3,
        fees: 3000
      },
      {
        courseId: 5,
        topicName: " Introduction to RESTFul Web Services (API's) ",
        topicId: 4,
        fees: 2000
      },
      {
        courseId: 5,
        topicName: "Spring Boot Web API Advance ",
        topicId: 5,
        fees: 3000
      },
      {
        courseId: 5,
        topicName:
          " Spring Boot Micro service Architecture API Security using OAuth2.0 JWT",
        topicId: 6,
        fees: 4000
      },
      {
        courseId: 5,
        topicName: " Database connections and concepts",
        topicId: 7,
        fees: 3000
      },
      {
        courseId: 5,
        topicName: "Application Unit Testing and Deployment on AWS",
        topicId: 8,
        fees: 2000
      },

      {
        courseId: 5,
        topicName: " Any Custom Topic/Particular issue Support",
        topicId: 10,
        fees: 0
      }
    ];

    return courseList;
  }
  getDiscountPercentage(): number {
    return 18;
  }
  getGSTRate(): number {
    return 18;
  }
  navigateToRegister(courseId, topicId) {
    this.router.navigate(["/registerCourse"], {
      queryParams: { course: courseId, topic: topicId },
      fragment: "mainmenu"
    });
  }
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
  navigateToPath(path: string) {
    this.router.navigate([path]);
  }
  getStates(): Observable<Array<Cities>> {
    let url = `${environment.baseUrl}${environment.getState}`;
    return this._httpclient.get<Array<Cities>>(url);
  }
}
