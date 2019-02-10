import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bundle } from '../models/Bundle';
import { ServResp } from '../models/ServResp';
import { Observable, Subject } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BundleService {
  /**
   * The URL of the API-server
   * (same as the static serving server in this case)
   */
  private server = 'http://localhost:3000'; // location.origin;

  /**
   * HTTP-headers for Content-Type: application/json
   */
  private headers: HttpHeaders;

  /**
   * Used to notify other components of added bundles
   */
  public bundleAdded$: Subject<Bundle>;
  /**
   * Used to notify other components of removed bundles
   */
  public bundleRemoved$: Subject<Bundle>;

  /**
   * Creates an instance of BundleService.
   * @param http Injected HttpClient
   */
  constructor(private http: HttpClient) {
    /* HttpHeaders is immutable */
    const HEADERS = new HttpHeaders();
    this.headers = HEADERS.append('Content-Type', 'application/json');

    this.bundleAdded$ = new Subject();
    this.bundleRemoved$ = new Subject();
  }

  /**
   * Get all the bundles from the server
   */
  getAllBundles(): Observable<Bundle[]> {
    return this.http.get<Bundle[]>(`${this.server}/api`);
  }


  /**
   * Tries to delete specified bundle
   */
  deleteBundle(bundle: Bundle) {
    return this.http.delete<ServResp>(`${this.server}/admin/bundle/${bundle._id}`,
     { headers: this.headers })
     .pipe(
       tap(_ => console.log(`Deleted bundle ${bundle.name}`)),
     );
  }


  /**
   * Tries update specified bundle, with specified arguments
   *
   * @param bundle The bundle should include _id, then whatever changes should be made in the object
   */
  updateBundle(bundle: Bundle) {
    const body = JSON.stringify({ bundle });
    return this.http.put<Bundle>(`${this.server}/admin/bundle/`, body,
    { headers: this.headers })
    .pipe(
      tap(_ => console.log(`Updated bundle ${bundle.name}`))
    );
  }

  /**
   * Tries to add the specified bundle
   * @param bundle The bundle to add -- do not include _id
   */
  addBundle(bundle: Bundle): Observable<Bundle> {
    const body = JSON.stringify({newBundle: bundle});
    return this.http.post<Bundle>(`${this.server}/admin/bundle/`, body, { headers: this.headers });
  }

  /**
   * Used by app-add to notify other components that a new bundle has been added
   */
  onAddBundle(bundle: Bundle) {
    this.bundleAdded$.next(bundle);
  }

  /**
   * Used by app-del to notify other components that a bundle has been removed
   */
  onDelBundle(bundle: Bundle) {
    this.bundleRemoved$.next(bundle);
  }
}
