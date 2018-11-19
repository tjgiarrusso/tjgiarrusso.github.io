import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  newURL: string
  constructor() {}

  ngOnInit() {
    console.log("WARNING: CANNOT USE PARENTHESES IN QUERY DUE TO ROUTING ISSUE WITH ANGULAR ITSELF \
    PERTAINING TO USING PARENTHESES IN A URL: https://github.com/angular/angular/issues/10280");
  }

  submitForm(newQuery: string) {
    var q = newQuery;
    console.log(q);
    this.newURL = "/query/" + q;
    location.href = this.newURL;
  }

}
