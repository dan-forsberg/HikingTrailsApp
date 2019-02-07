import { Component, OnInit, Input } from '@angular/core';
import { Bundle } from '../models/Bundle';
import { BundleService } from '../services/bundle.service';

@Component({
  selector: 'app-edit-bundle',
  templateUrl: './edit-bundle.component.html',
  styleUrls: ['./edit-bundle.component.css']
})
export class EditBundleComponent implements OnInit {
  @Input() bundle: Bundle;

  constructor(private bundleServ: BundleService) { }

  ngOnInit() {
  }

  updateBundle() {
    this.bundleServ.updateBundle(this.bundle).subscribe(
      resp => console.log(resp)
    );
  }

  deleteBundle() {
    this.bundleServ.deleteBundle(this.bundle).subscribe(
      resp => console.log(resp)
    );
  }

}
