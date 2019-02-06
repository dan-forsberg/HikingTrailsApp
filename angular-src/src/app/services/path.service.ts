import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Path } from '../models/Path';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  private server = 'http://localhost:3000';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    /* HttpHeaders is immutable */
    const HEADERS = new HttpHeaders();
    this.headers = HEADERS.append('Content-Type', 'application/json');
  }

  getAllPaths(): Observable<Path[]> {
    return this.http.get<Path[]>(`${this.server}/api`);
  }

  deletePath(path: Path) {
    return this.http.delete<Path>(`${this.server}/admin/path/${path.id}`,
     { headers: this.headers })
     .pipe(
       tap(_ => console.log(`Deleted path ${path.name}`))
     );
  }

  updatePath(path: Path) {
    const body = JSON.stringify({ path });
    return this.http.put<Path>(`${this.server}/admin/path/`, body,
    { headers: this.headers })
    .pipe(
      tap(_ => console.log(`Updated path ${path.name}`))
    );
  }

  addPath(path: Path): Observable<Path> {
    const body = JSON.stringify(path);
    return this.http.post<Path>(`${this.server}/admin/path/`, body, { headers: this.headers });
  }
}
