import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddressFormComponent } from "../address-form/address-form.component";
@Component({
  selector: "app-select-address",
  templateUrl: "./select-address.component.html",
  styleUrls: ["./select-address.component.css"]
})
export class SelectAddressComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  openAddressForm() {
    const modalRef = this.modalService.open(AddressFormComponent, {
      backdrop: "static"
    });
    modalRef.componentInstance.name = "World";
    modalRef.result.then(result => {});
  }
}
