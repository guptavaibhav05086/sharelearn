import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}
  navigateToProduct(prodName, e) {
    e.preventDefault();
    let params = { selectedProduct: prodName };
    this.helper.navigateToPathWithparams("/createorder", {
      queryParams: params
    });
  }
  navigateTopath(path, e) {
    e.preventDefault();

    this.helper.navigateToPath(path);
  }
  openLinkSocial(path,e){
    e.preventDefault();
   
    window.open(path,"_blank");
    
  }

}
