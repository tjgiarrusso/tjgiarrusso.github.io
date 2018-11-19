import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QueryComponent } from './query/query.component';
import { DrinkerComponent } from './drinker/drinker.component';
import { DrinkerResultComponent } from './drinker-result/drinker-result.component'
import { QueryResultComponent } from './query-result/query-result.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'bars',
	},
	{
		path: 'static',
		pathMatch: 'full',
		redirectTo: 'bars'
	},	
	{
		path: 'bars',
		pathMatch: 'full',
		component: WelcomeComponent
	},
	{
		path: 'bars/:bar',
		pathMatch: 'full',
		component: BarDetailsComponent
	},
	{
		path: 'query',
		pathMatch: 'full',
		component: QueryComponent
	},
	{
		path: 'query/:query',
		component: QueryResultComponent
	},
	{
		path: 'drinker',
		pathMatch: 'full',
		component: DrinkerComponent
	},
	{
		path: 'drinker/:drinker',
		component: DrinkerResultComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
