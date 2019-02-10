import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from '../models/Place';
import { Observable, Subject } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  /**
   * The URL of the API-server
   * (same as the static serving server in this case)
   */
  private server = location.origin;

  /**
   * HTTP-headers for Content-Type: application/json
   */
  private headers: HttpHeaders;

  /**
   * Used to notify other components of added places
   */
  public placeAdded$: Subject<Place>;
  /**
   * Used to notify other components of removed places
   */
  public placeRemoved$: Subject<Place>;

  /**
   * Creates an instance of PlaceService.
   * @param http Injected HttpClient
   */
  constructor(private http: HttpClient) {
    /* HttpHeaders is immutable */
    const HEADERS = new HttpHeaders();
    this.headers = HEADERS.append('Content-Type', 'application/json');

    this.placeAdded$ = new Subject();
    this.placeRemoved$ = new Subject();
  }

  /**
   * Get all the places from the server
   */
  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.server}/api/place`);
  }

  /**
   * Get a specific place
   *
   * @param id The _id of requesting place
   */
  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.server}/api/place/${id}`);
  }

  /**
   * Tries to delete specified place
   */
  deletePlace(place: Place) {
    return this.http.delete<Place>(`${this.server}/admin/place/${place._id}`,
     { headers: this.headers })
     .pipe(
       tap(_ => console.log(`Deleted place ${place.name}`))
     );
  }

  /**
   * Tries update specified place, with specified arguments
   *
   * @param place The place should include _id, then whatever changes should be made in the object
   */
  updatePlace(place: Place) {
    const body = JSON.stringify({ place });
    return this.http.put<Place>(`${this.server}/admin/place/`, body,
    { headers: this.headers })
    .pipe(
      tap(_ => console.log(`Updated place ${place.name}`))
    );
  }

  /**
   * Tries to add the specified place
   * @param place The place to add -- do not include _id
   */
  addPlace(place: Place): Observable<Place> {
    const body = JSON.stringify({newPlace: place});
    console.log(`Sending: ${body}`);
    return this.http.post<Place>(`${this.server}/admin/place/`, body, { headers: this.headers });
  }

  /**
   * Used by app-add to notify other components that a new place has been added
   */
  onAddPlace(place: Place) {
    this.placeAdded$.next(place);
  }

  /**
   * Used by app-del to notify other components that a place has been removed
   */
  onDelPlace(place: Place) {
    this.placeRemoved$.next(place);
  }
}
