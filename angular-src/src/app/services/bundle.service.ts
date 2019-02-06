import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bundle } from '../models/Bundle';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BundleService {

  private server = 'http://localhost:3000';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    /* HttpHeaders is immutable */
    const HEADERS = new HttpHeaders();
    this.headers = HEADERS.append('Content-Type', 'application/json');
  }

  getAllBundles(): Observable<Bundle[]> {
    return this.http.get<Bundle[]>(`${this.server}/api`);
  }

  deleteBundle(bundle: Bundle) {
    return this.http.delete<Bundle>(`${this.server}/admin/bundle/${bundle._id}`,
     { headers: this.headers })
     .pipe(
       tap(_ => console.log(`Deleted bundle ${bundle.name}`))
     );
  }

  updateBundle(bundle: Bundle) {
    const body = JSON.stringify({ bundle });
    return this.http.put<Bundle>(`${this.server}/admin/bundle/`, body,
    { headers: this.headers })
    .pipe(
      tap(_ => console.log(`Updated bundle ${bundle.name}`))
    );
  }

  addBundle(bundle: Bundle): Observable<Bundle> {
    const body = JSON.stringify(bundle);
    return this.http.post<Bundle>(`${this.server}/admin/bundle/`, body, { headers: this.headers });
  }
}
