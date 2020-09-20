import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section-top-nav',
  templateUrl: './section-top-nav.component.html',
  styleUrls: ['./section-top-nav.component.css']
})
export class SectionTopNavComponent implements OnInit {

  @Output() componentLoaded = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    this.componentLoaded.emit(true);
  }

}
