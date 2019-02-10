import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Bundle } from './models/Bundle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hiking Trails';
  showEditBundle = false;

  showAddBundle = false;
  showAddPath = false;
  showAddPlace = false;

  toggleAddBundle() {
    this.showAddBundle = !this.showAddBundle;
  }

  toggleAddPath() {
    this.showAddPath = !this.showAddPath;
  }

  toggleAddPlace() {
    this.showAddPlace = !this.showAddPlace;
  }

  toggleEdit() {
    this.showEditBundle = !this.showEditBundle;
  }
}
