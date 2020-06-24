import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  constructor(private _helper: HelperService) {}
courseId = 3;
  ngOnInit() {}
  register(courseId, topicId) {
    this._helper.navigateToRegister(courseId, topicId);
  }

}
