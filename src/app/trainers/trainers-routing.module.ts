import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TrainersComponent } from "./trainers.component";
import { ViewprofileComponent } from "./viewprofile/viewprofile.component";
import { EditprofileComponent } from "./editprofile/editprofile.component";
const routes: Routes = [
  { path: "", component: TrainersComponent },
  { path: "viewProfile", component: ViewprofileComponent },
  { path: "editProfile", component: EditprofileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainersRoutingModule {}
