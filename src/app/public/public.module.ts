import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//import { HomeComponent } from "./home/home.component";
//import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ComingsoonComponent } from "./comingsoon/comingsoon.component";

@NgModule({
  declarations: [FooterComponent, ComingsoonComponent],
  imports: [CommonModule],
  exports: [FooterComponent, ComingsoonComponent]
})
export class PublicModule {}
