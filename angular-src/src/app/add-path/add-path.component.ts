import { Component, OnInit } from '@angular/core';
import {Path} from '../models/Path';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-add-path',
  templateUrl: './add-path.component.html',
  styleUrls: ['./add-path.component.css']
})
export class AddPathComponent implements OnInit {
  newPath: Path = {
    name: '',
    image: '',
    info: '',
    length: '',
    duration: 0,
    places: [],
  };

  constructor(private pathServ: PathService) { }

  ngOnInit() {
  }

  submit() {
    /* TODO: add EE */
    this.pathServ.addPath(this.newPath).subscribe(
      resp => console.log(resp)
    );
  }

}
