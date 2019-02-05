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

  constructor(private bundleServ: BundleService) { }

  ngOnInit() {
    this.loadBundles();
  }

  loadBundles() {
    this.bundleServ.getAllBundles().subscribe(
      resp => this.bundles = resp
    );
  }

  deleteBundle(bundle: Bundle) {
    this.bundleServ.deleteBundle(bundle.id).subscribe(
      resp => this.bundles = this.bundles
        .filter(bundles =>
          bundles !== bundle
        )
    );
  }
}
