import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bar {
 BAR_NAME: string;
 LICENSE: string;
 ADDRESS: string;
 CITY: string;
 STATE: string;
 ZIPCODE: string;
}


@Injectable({
  providedIn: 'root'
})
export class BarsService {
 constructor(
  public http: HttpClient
 ) { }
 
 getBars() {
  return this.http.get<Bar[]>('/api/bar');
 }

}
