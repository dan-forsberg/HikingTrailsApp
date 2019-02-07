import { Component, OnInit, Input } from '@angular/core';
import { PlacePosition } from '../models/PlacePosition';

@Component({
  selector: 'app-view-polyline',
  templateUrl: './view-polyline.component.html',
  styleUrls: ['./view-polyline.component.css']
})
export class ViewPolylineComponent implements OnInit {
  @Input() positions: PlacePosition[];

  constructor() { }

  ngOnInit() {
  }

}
