import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Transaction {
  BAR_NAME: string, 
  DATE: string, 
  PRICE1: string, 
  TAX1: string, 
  TIME: string, 
  TIP: string, 
  TOTAL_COST1: string, 
  TRANSACTION_ID: string
}

@Injectable({
  providedIn: 'root'
})
export class GetDrinkerTransactionsService {
  constructor(
    public http: HttpClient
  ) { }

  getDrinkerTransactions(name: string) {
    return this.http.get<Transaction[]>('/api/drinker/' + name);
  }

  getMostBeers(name: string) {
    return this.http.get<any[]>('/api/drinker/beerCounts/' + name);
  }
}
