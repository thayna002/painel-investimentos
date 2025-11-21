import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  getProfile(clientId: number) {
    return this.http.get<any>('/assets/mocks/profiles.json').pipe(
      map(json => json[clientId.toString()] ?? null)
    );
  }
}


