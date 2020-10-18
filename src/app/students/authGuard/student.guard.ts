import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../../services/login.service";

@Injectable({
  providedIn: "root"
})
export class StudentGuard implements CanActivate {
  constructor(private service: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    debugger;
    let token = this.service.getUserToken();
    let isUserVerified = false;
    if (token.type.toLocaleLowerCase() == "designer") {
      if (isUserVerified) {
        return true;
      } else {
        this.router.navigate(["profile"]);
      }
    }
    this.router.navigate(["/login"]);
  }
}
