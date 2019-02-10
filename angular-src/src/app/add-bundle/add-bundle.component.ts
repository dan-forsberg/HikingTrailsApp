import { Component, OnInit } from '@angular/core';
import { Bundle } from '../models/Bundle';
import { BundleService } from '../services/bundle.service';

@Component({
  selector: 'app-add-bundle',
  templateUrl: './add-bundle.component.html',
  styleUrls: ['./add-bundle.component.css']
})
export class AddBundleComponent implements OnInit {
  newBundle: Bundle;
  /* Take user input as a string, parse it into number[]
   * and add it into newBundle.paths. If saving input directly into
   * newBundle.paths backend will reject */
  paths: string;

  constructor(private bundleServ: BundleService) {}

  ngOnInit() {
    this.newBundle = {
      name: '',
      image: '',
      info: '',
      paths: [],
    };
  }

  submit() {
    /* split on comma with optional whitespace */
    const pathsExploded = this.paths.split(/\s*,\s*/);
    for (let i = 0; i < pathsExploded.length; i++) {
      const path = pathsExploded[i];
      this.newBundle.paths.push(Number(path));
    }

    this.bundleServ.addBundle(this.newBundle).subscribe(
      resp => {
        /* Success */
        if (resp.name === this.newBundle.name) {
          this.bundleServ.onAddBundle(resp);
        }
      }
    );
  }
}
