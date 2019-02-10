import { Component, OnInit } from '@angular/core';
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
    position: {lng: 0, lat: 0},
  };

  constructor(private placeServ: PlaceService) { }

  ngOnInit() {
  }

  submit() {
    this.placeServ.addPlace(this.newPlace).subscribe(
      resp => {
        /* success */
        if (resp.name === this.newPlace.name) {
          console.log('Place creation successful!');
          this.placeServ.onAddPlace(resp);
        }
      }
    );
  }
}
