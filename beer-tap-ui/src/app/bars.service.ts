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

//for bars page
export interface TopSpenders{
  Drinker: string;
  Spent: number;
}

export interface BestBeers{
  Beers: string,
  Amount: number
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
 
 //for bars page
 getBar(barName:string){
   return this.http.get<Bar>('/api/bars/' + barName)
 }

 //for bars page
 getBarTopSpenders(barName:string){
    return this.http.get<TopSpenders[]>('/api/bars/spenders/' + barName)
 }

 getBarBestBeers(barName: string, date: string){
   return this.http.get<BestBeers[]>('/api/bars/bestbeers/' + barName + '/' + date)
 }

}
