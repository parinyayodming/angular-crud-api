import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'https://www.melivecode.com/api/users';
@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/`, data);
  }

  delete(id: any) {
    const options = {
      body: {
        id: `${id}`,
      },
    };
    return this.http.delete(`${baseUrl}/delete`, options);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  findByTitle(fname: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?search=${fname}`);
  }
}
