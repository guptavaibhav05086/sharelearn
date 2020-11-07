import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-social-media',
  templateUrl: './section-social-media.component.html',
  styleUrls: ['./section-social-media.component.css']
})
export class SectionSocialMediaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openLinkSocial(path,e){
    e.preventDefault();
    //this._helper.navigateToPath("/terms");
    window.open(path,"_blank");
    // let modelRef = this.modalService.open(TermsConditionsComponent);
    // modelRef.componentInstance.type = type;
    // modelRef.result.then(data => {
    //   //debugger;
    //   console.log(data);
      
    // });
  }

}
