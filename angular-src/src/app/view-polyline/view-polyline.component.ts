import { Component, OnInit, Input } from '@angular/core';
import { Position } from '../models/Position';

@Component({
  selector: 'app-view-polyline',
  templateUrl: './view-polyline.component.html',
  styleUrls: ['./view-polyline.component.css']
})
export class ViewPolylineComponent implements OnInit {
  @Input() positions: Position[];

  constructor() { }

  ngOnInit() {
  }

}
