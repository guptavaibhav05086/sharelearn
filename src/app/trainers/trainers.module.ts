import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainersRoutingModule } from './trainers-routing.module';
import { TrainersComponent } from './trainers.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


@NgModule({
  declarations: [TrainersComponent, ViewprofileComponent, EditprofileComponent],
  imports: [
    CommonModule,
    TrainersRoutingModule
  ]
})
export class TrainersModule { }
