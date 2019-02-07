import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from '../models/Place';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private server = 'http://localhost:3000';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    /* HttpHeaders is immutable */
    const HEADERS = new HttpHeaders();
    this.headers = HEADERS.append('Content-Type', 'application/json');
  }

  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.server}/api/place`);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.server}/api/place/${id}`);
  }

  deletePlace(place: Place) {
    return this.http.delete<Place>(`${this.server}/admin/place/${place._id}`,
     { headers: this.headers })
     .pipe(
       tap(_ => console.log(`Deleted place ${place.name}`))
     );
  }

  updatePlace(place: Place) {
    const body = JSON.stringify({ place });
    return this.http.put<Place>(`${this.server}/admin/place/`, body,
    { headers: this.headers })
    .pipe(
      tap(_ => console.log(`Updated place ${place.name}`))
    );
  }

  addPlace(place: Place): Observable<Place> {
    const body = JSON.stringify(place);
    return this.http.post<Place>(`${this.server}/admin/place/`, body, { headers: this.headers });
  }
}
