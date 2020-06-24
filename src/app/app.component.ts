import { Component } from "@angular/core";

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  ActivatedRoute
} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "mLearnApp";
  loading = false;

  ngOnInit() {}

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinnerService.show();

          this.loading = true;
          console.log("Navigation Start");

          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.spinnerService.hide();
          console.log("Navigation End");
          this.loading = false;
          break;
        }
        case event instanceof NavigationStart: {
          break;
        }
      }
    });
  }
}
