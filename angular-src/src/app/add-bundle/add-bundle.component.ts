import { Component, OnInit } from '@angular/core';
import { Bundle } from '../models/Bundle';
import { BundleService } from '../services/bundle.service';

@Component({
  selector: 'app-add-bundle',
  templateUrl: './add-bundle.component.html',
  styleUrls: ['./add-bundle.component.css']
})
export class AddBundleComponent implements OnInit {
  newBundle: Bundle = {
    name: '',
    image: '',
    info: '',
    paths: [],
  };
  /* Take user input as a string, parse it into number[]
   * and add it into newBundle.paths. If saving input directly into
   * newBundle.paths backend will reject */
  paths: string;

  constructor(private bundleServ: BundleService) {}

  ngOnInit() {
  }

  submit() {
    /* split on comma with optional whitespace */
    const pathsExploded = this.paths.split(/\s*,\s*/);
    for (let i = 0; i < pathsExploded.length; i++) {
      const path = pathsExploded[i];
      this.newBundle.paths.push(Number(path));
    }

    /* TODO: add EE */
    this.bundleServ.addBundle(this.newBundle).subscribe(
      resp => console.log(resp)
    );
  }
}
