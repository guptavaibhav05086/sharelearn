import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "src/app/services/login.service";

@Injectable({
  providedIn: "root"
})
export class PrintersGuard implements CanActivate {
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
    if (token.type != null && token.type.toLocaleLowerCase() == "printer") {
      return true;
    }
    this.router.navigate(["/login"]);
    //return true;
  }
}
