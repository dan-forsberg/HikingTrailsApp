import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Path } from '../models/Path';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  /**
   * The URL of the API-server
   * (same as the static serving server in this case)
   */
  private server = 'http://localhost:3000';//location.origin;

  /**
   * HTTP-headers for Content-Type: application/json
   */
  private headers: HttpHeaders;

  /**
   * Creates an instance of PathService.
   * @param http Injected HttpClient
   */
  constructor(private http: HttpClient) {
    /* HttpHeaders is immutable */
    const HEADERS = new HttpHeaders();
    this.headers = HEADERS.append('Content-Type', 'application/json');
  }

  /**
   * Get all the paths from the server
   */
  getAllPaths(): Observable<Path[]> {
    return this.http.get<Path[]>(`${this.server}/api/path`);
  }


  /**
   * Get a specific path
   *
   * @param id The _id of requesting path
   */
  getPath(id: number) {
    return this.http.get<Path>(`${this.server}/api/path/${id}`);
  }

  /**
   * Tries to delete specified path
   */
  deletePath(path: Path) {
    return this.http.delete<Path>(`${this.server}/admin/path/${path._id}`,
     { headers: this.headers })
     .pipe(
       tap(_ => console.log(`Deleted path ${path.name}`))
     );
  }

  /**
   * Tries update specified path, with specified arguments
   *
   * @param path The path should include _id, then whatever changes should be made in the object
   */
  updatePath(path: Path) {
    const body = JSON.stringify({ path });
    return this.http.put<Path>(`${this.server}/admin/path/`, body,
    { headers: this.headers })
    .pipe(
      tap(_ => console.log(`Updated path ${path.name}`))
    );
  }

  /**
   * Tries to add the specified path
   * @param path The path to add -- do not include _id
   */
  addPath(path: Path): Observable<Path> {
    const body = JSON.stringify({newPath: path});
    return this.http.post<Path>(`${this.server}/admin/path/`, body, { headers: this.headers });
  }
}
