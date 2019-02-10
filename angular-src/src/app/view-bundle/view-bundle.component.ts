import { Component, OnInit, Input } from '@angular/core';
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
  showMoreInfo = false;
  @Input() addBundle: Bundle;
  showEditBundle = false;

  constructor(private bundleServ: BundleService) { }

  ngOnInit() {
    this.loadBundles();

    this.bundleServ.bundleAdded$.subscribe({
      next: bundle => this.onAddBundle(bundle)
    });
    this.bundleServ.bundleRemoved$.subscribe({
      next: bundle => this.onDelBundle(bundle)
    });
  }

  toggleEdit() {
    this.showEditBundle = !this.showEditBundle;
  }

  onAddBundle(bundle: Bundle) {
    this.bundles = this.bundles.concat(bundle);
  }

  onDelBundle(bundle: Bundle) {
    this.bundles = this.bundles.filter(bun =>
      bun !== bundle
    );
    this.showMoreInfo = false;
  }

  toggleMoreInfo(bundle: Bundle) {
    this.selectedBundle = bundle;
    this.showMoreInfo = !this.showMoreInfo;
  }

  loadBundles() {
    this.bundleServ.getAllBundles().subscribe(
      resp => this.bundles = resp
    );
  }
}
