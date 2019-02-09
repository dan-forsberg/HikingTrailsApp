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
  showMoreInfo = false;
  showEditBundle = false;

  showAddBundle = false;
  showAddPath = false;
  showAddPlace = false;

  constructor(private bundleServ: BundleService) { }

  ngOnInit() {
    this.loadBundles();
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

  toggleAddBundle() {
    this.showAddBundle = !this.showAddBundle;
  }

  toggleAddPath() {
    this.showAddPath = !this.showAddPath;
  }

  toggleAddPlace() {
    this.showAddPlace = !this.showAddPlace;
  }

  toggleMoreInfo(bundle: Bundle) {
    this.selectedBundle = bundle;
    this.showMoreInfo = !this.showMoreInfo;
  }

  toggleEdit() {
    this.showEditBundle = !this.showEditBundle;
  }

  loadBundles() {
    this.bundleServ.getAllBundles().subscribe(
      resp => this.bundles = resp
    );
  }
}
