import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { GetDrinkersService, Drinker } from '../get-drinkers.service';
import { GetDrinkerTransactionsService, Transaction } from '../get-drinker-transactions.service';

@Component({
  selector: 'app-drinker',
  templateUrl: './drinker.component.html',
  styleUrls: ['./drinker.component.css']
})
export class DrinkerComponent implements OnInit {
  drinkers: Drinker[]
  constructor(
    public getDrinkersService: GetDrinkersService
  ) {}

  ngOnInit() {
    this.getDrinkers();
  }

  getDrinkers() {
    this.getDrinkersService.getDrinkers().subscribe(
      data => {
        this.drinkers = data;
      },
      error => {
        alert('Could not retrieve a list of drinkers');
      }
      );
  }

}
