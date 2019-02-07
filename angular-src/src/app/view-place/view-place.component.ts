import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../models/Place';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'app-view-place',
  templateUrl: './view-place.component.html',
  styleUrls: ['./view-place.component.css']
})
export class ViewPlaceComponent implements OnInit {
  @Input() place_id: number;
  place: Place;

  editPlace = false;

  constructor(private placeServ: PlaceService) { }

  ngOnInit() {
    this.placeServ.getPlace(this.place_id).subscribe(
      resp => this.place = resp
    );
  }

  toggleEditPlace() {
    this.editPlace = !this.editPlace;
  }

}
