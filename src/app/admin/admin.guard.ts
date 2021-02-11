import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private service: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = this.service.getUserToken();
    let isUserVerified = false;
    if (
      token.type.toLocaleLowerCase() == "admin" ||
      token.type.toLocaleLowerCase() == "support"
    ) {
      return true;
      // let emailVerfied = localStorage.getItem("emailVerificationDone");
      // if (emailVerfied == "True") {
      //   return true;
      // } else {
      //   this.router.navigate(["/designer/dashboard"]);
      // }
    }
    this.router.navigate(["/login"]);
  }
}
