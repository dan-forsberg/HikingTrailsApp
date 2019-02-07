import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ViewBundleComponent } from './view-bundle/view-bundle.component';

import { BundleService } from './services/bundle.service';
import { PathService } from './services/path.service';
import { PlaceService } from './services/place.service';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { EditBundleComponent } from './edit-bundle/edit-bundle.component';
import { ViewPathComponent } from './view-path/view-path.component';
import { AddPathComponent } from './add-path/add-path.component';
import { EditPathComponent } from './edit-path/edit-path.component';
import { ViewPolylineComponent } from './view-polyline/view-polyline.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewBundleComponent,
    AddBundleComponent,
    EditBundleComponent,
    ViewPathComponent,
    AddPathComponent,
    EditPathComponent,
    ViewPolylineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6pSnATPY41mvcPTUhkwtqb3n1Y5BEaR0'
    })
  ],
  providers: [BundleService, PathService, PlaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
