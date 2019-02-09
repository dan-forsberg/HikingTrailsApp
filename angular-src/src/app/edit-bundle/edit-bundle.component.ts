import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bundle } from '../models/Bundle';
import { BundleService } from '../services/bundle.service';

@Component({
  selector: 'app-edit-bundle',
  templateUrl: './edit-bundle.component.html',
  styleUrls: ['./edit-bundle.component.css']
})
export class EditBundleComponent implements OnInit {
  @Input() bundle: Bundle;
  @Output() delBundle: EventEmitter<Bundle> = new EventEmitter<Bundle>();
  deleted = false;

  constructor(private bundleServ: BundleService) { }

  ngOnInit() {
    console.log(this.bundle);
  }

  updateBundle() {
    /* Could show something to the end-user to confirm changes */
    this.bundleServ.updateBundle(this.bundle).subscribe(
      resp => console.log(resp)
    );
  }

  deleteBundle() {
    this.bundleServ.deleteBundle(this.bundle).subscribe(
      (resp) => {
        /* */
        if (resp.succeeded) {
          this.delBundle.emit(this.bundle);
          this.deleted = true;
        } else {
          console.log('Unable to delete bundle');
        }
    }
    );
  }

}
