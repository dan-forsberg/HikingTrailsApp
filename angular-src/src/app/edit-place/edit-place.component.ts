import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../models/Place';
import { Media } from '../models/Media';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
  @Input() place: Place;
  media: Media;

  constructor(private placeServ: PlaceService) { }

  ngOnInit() {
  }

  updatePlace() {
    /* TODO: add EE */
    this.place.media.push(this.media);
    this.placeServ.updatePlace(this.place).subscribe(
      resp => console.log(resp)
    );
  }

  deletePlace() {
    this.placeServ.deletePlace(this.place).subscribe(
      resp => console.log(resp)
    );
  }

}
