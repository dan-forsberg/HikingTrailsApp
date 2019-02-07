import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Place } from '../models/Place';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {
  newPlace: Place = {
    name: '',
    info: '',
    radius: 25,
    position: {lng: 0, lat: 0, radius: 25},
  };
  @Output() addPlace: EventEmitter<Place> = new EventEmitter<Place>();

  constructor(private placeServ: PlaceService) { }

  ngOnInit() {
  }

  submit() {
    /* TODO: add EE */
    this.placeServ.addPlace(this.newPlace).subscribe(
      resp => console.log(resp)
    );
  }
}
