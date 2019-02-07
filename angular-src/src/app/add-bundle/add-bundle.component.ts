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
    paths: []
  };

  constructor(private bundleServ: BundleService) {
   }

  ngOnInit() {
  }

  submit() {
    /* TODO: add EE */
    this.bundleServ.addBundle(this.newBundle).subscribe(
      resp => console.log(resp)
    );
  }
}
