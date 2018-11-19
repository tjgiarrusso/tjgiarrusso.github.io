import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, TopSpenders, BestBeers } from '../bars.service';
import { HttpResponse } from '@angular/common/http';

import { DatePipe } from '@angular/common';

declare const Highcharts: any;


@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css'],
  providers: [DatePipe]
  
})
export class BarDetailsComponent implements OnInit {

  barName: string
  barDetails: Bar;
  spenders: TopSpenders[];
  bestBeers: BestBeers[];
  date: Date = new Date();
  stringDate: string;


  constructor(
    private barService: BarsService,
    private route: ActivatedRoute,
    public datepipe: DatePipe
  ) { 
    route.paramMap.subscribe(
      (paramMap) => 
      {
        this.barName = paramMap.get('bar');
      }
    );
  }  

  ngOnInit() {
    this.getBarDetails(this.barName);
    this.getBarTopSpendersComp(this.barName);
    //this.getBestBeers(this.barName);
  }


  getBarDetails(barName: string){
            //get the basic details of the bar
            this.barService.getBar(this.barName).subscribe(
              data => {
                this.barDetails = data;
              },
              (error: HttpResponse<any>) => {
                if (error.status === 404){
                  alert('Bar not found :(');
                }
                else{
                  console.error(error.status + " : " + error.body);
                  alert('An error ocurred on the server. Please check the browser console.')
                }
              }
            );
  }


  getBarTopSpendersComp(barName: string){
           //get the top spenders of the bar
           this.barService.getBarTopSpenders(this.barName).subscribe(
             data => {
               this.spenders = data;


               const drinker = [];
               const spent = [];
   
               data.forEach(i => {
                 drinker.push(i.Drinker);
                 spent.push(i.Spent);
               })
   
               this.renderSpendersChart(drinker, spent);
   
             },
             (error: HttpResponse<any>) => {
               if (error.status === 404){
                 alert('Bar not found :( (1)');
               }
               else{
                 console.error(error.status + " : " + error.body);
                 alert('An error ocurred on the server. Please check the browser console.')
               }
             }
           )
  }


  getBestBeers(barName: string){
    this.stringDate =this.datepipe.transform(this.date, 'MM/dd/yyyy');
    //this.stringDate = this.date;
    console.log("latest date " + this.stringDate);

    this.barService.getBarBestBeers(this.barName, this.stringDate).subscribe(
      data => {
        this.bestBeers = data;
        const beers = [];
        const amount = [];

        data.forEach(i => {
          beers.push(i.Beers);
          amount.push(i.Amount);
        })
        this.renderBestBeersChart(beers,amount);

      },
      (error: HttpResponse<any>) => {
        if (error.status === 404){
          alert('Bar not found :( (3)');
        }
        else{
          console.error(error.status + " : " + error.body);
          alert('An error ocurred on the server. Please check the browser console.')
        }
      }
    )
  }

  renderBestBeersChart(beers: string[], amount: number[]){
    Highcharts.chart('bestBeersGraph',
    {
      chart: {
        type:'column'
      },
      title: {
        text: ''
      },
      xAxis:{
        categories: beers,
        title: {
          text: 'Name'
        }
      },
      yAxis: {
        min: 0,
        title:{
          text: 'Amount'
        },
        labels:{
          overflow: 'justify'
        }
      },
      plotoptions:{
        drinkers:{
          dataLabels:{
            enabled:true
          }
        }
      },
      legend:{
        enabled:false
      },
      credits:{
        enabled:false
      },
      series:[{
        data:amount
      }]
    }
  )
}
  


  renderSpendersChart(drinkers: string[], spent: number[]){
    Highcharts.chart('spendersgraph',
      {
        chart: {
          type:'column'
        },
        title: {
          text: 'Top 10 Spenders Here'
        },
        xAxis:{
          categories: drinkers,
          title: {
            text: 'Name'
          }
        },
        yAxis: {
          min: 0,
          title:{
            text: 'Amount they spent'
          },
          labels:{
            overflow: 'justify'
          }
        },
        plotoptions:{
          drinkers:{
            dataLabels:{
              enabled:true
            }
          }
        },
        legend:{
          enabled:false
        },
        credits:{
          enabled:false
        },
        series:[{
          data:spent
        }]
      }
    )
  }

}
