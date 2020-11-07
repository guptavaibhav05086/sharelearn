/// <reference types="@types/googlemaps" />
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
declare let google: any;

@Component({
  selector: "app-googleplaces",
  templateUrl: "./googleplaces.component.html",
  styleUrls: ["./googleplaces.component.css"]
})
export class GoogleplacesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild("addresstext") addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    //debugger;
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        componentRestrictions: { country: "IN" },
        types: [this.adressType] // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    //debugger;
    this.setAddress.emit(place);
  }
}
