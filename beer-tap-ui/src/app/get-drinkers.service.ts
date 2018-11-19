import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Drinker {
  DRINKER_NAME: string;
  ADDRESS: string;
  CITY: string;
  STATE: string;
  ZIPCODE: string;
  PHONE: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetDrinkersService {

  constructor(
    public http: HttpClient
  ) { }

  getDrinkers() {
    return this.http.get<Drinker[]>('/api/drinker/');
  }
}
