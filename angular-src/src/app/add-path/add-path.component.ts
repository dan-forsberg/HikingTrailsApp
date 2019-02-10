import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    this.pathServ.addPath(this.newPath).subscribe(
      resp => {
        /* success */
        if (resp.name === this.newPath.name) {
          this.pathServ.onAddPath(resp);
        }
      }
    );
  }

}
