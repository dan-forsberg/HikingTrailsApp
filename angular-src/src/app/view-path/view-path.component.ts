import { Component, OnInit, Input } from '@angular/core';
import { Path } from '../models/Path';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-view-path',
  templateUrl: './view-path.component.html',
  styleUrls: ['./view-path.component.css']
})
export class ViewPathComponent implements OnInit {
  @Input() path_id: number;
  path: Path;

  constructor(private pathServ: PathService) { }

  ngOnInit() {
    this.pathServ.getPath(this.path_id).subscribe(
      resp => this.path = resp
    );
  }

}
