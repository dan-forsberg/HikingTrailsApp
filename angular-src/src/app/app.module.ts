import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ViewBundleComponent } from './view-bundle/view-bundle.component';

import { BundleService } from './services/bundle.service';
import { PathService } from './services/path.service';
import { PlaceService } from './services/place.service';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { EditBundleComponent } from './edit-bundle/edit-bundle.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewBundleComponent,
    AddBundleComponent,
    EditBundleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [BundleService, PathService, PlaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
