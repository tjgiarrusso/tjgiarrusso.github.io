import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class CustomQueryService {

  constructor(
    public http:HttpClient
  ) { }

  getQueryResult(q: string) {
    return this.http.get<any[]>('/api/query/' + q);
  }
} 
