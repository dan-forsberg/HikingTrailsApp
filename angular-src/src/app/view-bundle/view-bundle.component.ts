import { Component, OnInit } from '@angular/core';
import { Bundle } from '../models/Bundle';
import { BundleService } from '../services/bundle.service';

@Component({
  selector: 'app-view-bundle',
  templateUrl: './view-bundle.component.html',
  styleUrls: ['./view-bundle.component.css']
})
export class ViewBundleComponent implements OnInit {
  bundles: Bundle[] = [];
  selectedBundle: Bundle = null;

  constructor(private bundleServ: BundleService) { }

  ngOnInit() {
    this.loadBundles();
  }

  onSelect(bundle: Bundle) {
    if (this.selectedBundle === bundle) {
      this.selectedBundle = null;
    } else {
      this.selectedBundle = bundle;
    }
  }

  updateBundle() {
    this.bundleServ.updateBundle(this.selectedBundle).subscribe(
      resp => console.log(resp)
    );
  }

  loadBundles() {
    this.bundleServ.getAllBundles().subscribe(
      resp => this.bundles = resp
    );
  }

  deleteBundle() {
    this.bundleServ.deleteBundle(this.selectedBundle).subscribe(
      resp => this.bundles = this.bundles
        .filter(bundles =>
          bundles !== this.selectedBundle
        )
    );
  }
}
