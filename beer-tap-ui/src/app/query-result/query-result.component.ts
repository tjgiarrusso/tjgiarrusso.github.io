import { Component, OnInit } from '@angular/core';
import { CustomQueryService } from '../custom-query.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css']
})
export class QueryResultComponent implements OnInit {
  queryResult: string;
  queryDataReturned: string;
  q: string;
  keys: string[];

  constructor(
    public queryService: CustomQueryService,
    private route: ActivatedRoute
    
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.q = paramMap.get('query');
    });
  }

  ngOnInit() {
    this.getQueryResult(this.q);
    console.log(this.queryResult);
  }

  getQueryResult(name: string) {
    this.queryService.getQueryResult(name).subscribe(
      data => { 
        this.queryResult = "Modification or Query was successful!";
        this.queryDataReturned = JSON.stringify(data, null, ' ');
      },

      error => {
        this.queryDataReturned = error.message.toString();
        this.queryResult = "Error :(";
      }
    );

  }

}
