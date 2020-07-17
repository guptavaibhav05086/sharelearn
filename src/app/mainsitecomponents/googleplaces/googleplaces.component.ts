/// <reference types="@types/googlemaps" />
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Inject,
  ElementRef
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DOCUMENT } from "@angular/common";
declare let google: any;

@Component({
  selector: "app-googleplaces",
  templateUrl: "./googleplaces.component.html",
  styleUrls: ["./googleplaces.component.css"]
})
export class GoogleplacesComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private _document) {}

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
    debugger;
    this.setAddress.emit(place);
  }
  addressChange() {
    let elemt: any = document.getElementsByClassName("pac-container")[0];
    console.log(elemt);
    if (elemt != null && elemt != undefined) elemt.style.zIndex = 9999;
  }
}
