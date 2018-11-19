import { Component, OnInit } from '@angular/core';
import { GetDrinkerTransactionsService, Transaction} from '../get-drinker-transactions.service';
import { Drinker } from '../get-drinkers.service';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'primeng/primeng';
declare const Highcharts: any;

@Component({
  selector: 'app-drinker-result',
  templateUrl: './drinker-result.component.html',
  styleUrls: ['./drinker-result.component.css']
})
export class DrinkerResultComponent implements OnInit {
  transactions: Transaction[];
  drinkerName: string;
  drinkerResult: Drinker;
  constructor(
    public transactionService: GetDrinkerTransactionsService,
    private route: ActivatedRoute
  ) { 
    route.paramMap.subscribe((paramMap) => {
      this.drinkerName = paramMap.get('drinker');
    });
     
  }

  ngOnInit() {
    this.getTransactions(this.drinkerName);
    this.getMostBeers(this.drinkerName);
  }

  getTransactions(name: string) {
    this.transactionService.getDrinkerTransactions(name).subscribe(
      data => {
        this.transactions = data;
      },
      error => {
        alert('Could not retrieve a list of transactions');
      }
    );
  }

  getMostBeers(name: string) {
    this.transactionService.getMostBeers(name).subscribe(
      data => {
        console.log(data);

        const beers = [];
        const counts = [];

        data.forEach(beer => {
          beers.push(beer.MENU_ITEM);
          counts.push(beer.S);
        });

        this.createChart(beers, counts);
      }
    );
  }

  createChart(beers, counts) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: "Most Frequently Ordered Beers"
      },
      xAxis: {
        categories: beers,
        title: {
          text: "Beers"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Order Frequency"
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counts
      }]
    });
  }


}
