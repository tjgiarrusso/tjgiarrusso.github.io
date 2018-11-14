import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  submitForm(str) {
	  var q = {query: str};
	  var strq = JSON.stringify(q);
	  
	  // CHANGE FROM LOCALHOST TO WEBSITE URL
	  var url = "http://localhost:4200/api/query"
	  var xmlhttp = new XMLHttpRequest();
	  xmlhttp.open("POST", url, true);
	  xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	  xmlhttp.send(strq);
  }

}
