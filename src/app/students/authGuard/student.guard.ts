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
    let token = this.service.getUserToken();
    if (token.type.toLocaleLowerCase() == "student") {
      return true;
    }
    this.router.navigate(["/login"]);
  }
}
