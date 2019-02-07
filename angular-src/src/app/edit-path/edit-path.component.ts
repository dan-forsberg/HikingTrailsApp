import { Component, OnInit, Input } from '@angular/core';
import { Path } from '../models/Path';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-edit-path',
  templateUrl: './edit-path.component.html',
  styleUrls: ['./edit-path.component.css']
})
export class EditPathComponent implements OnInit {
  @Input() path: Path;

  constructor(private pathServ: PathService) { }

  ngOnInit() {
  }

  updatePath() {
    /* TODO: add EE */
    this.pathServ.updatePath(this.path).subscribe(
      resp => console.log(resp)
    );
  }

  deletePath() {
    /* TODO: add EE */
    this.pathServ.deletePath(this.path).subscribe(
      resp => console.log(resp)
    );
  }
}
