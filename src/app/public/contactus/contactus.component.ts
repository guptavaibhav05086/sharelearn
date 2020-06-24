import { Component, OnInit, ViewChild } from "@angular/core";
import {} from "googlemaps";
@Component({
  selector: "app-contactus",
  templateUrl: "./contactus.component.html",
  styleUrls: ["./contactus.component.css"]
})
export class ContactusComponent implements OnInit {
  @ViewChild("map", {read:true})
  mapElement: any;
  map: google.maps.Map;
  constructor() {}

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(12.9135408, 77.634982),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
  }
}
