import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QueryComponent } from './query/query.component';
import { DrinkerComponent } from './drinker/drinker.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: WelcomeComponent
	},
	{
		path: './api/query',
		pathMatch: 'full',
		component: QueryComponent
	},
		path: './api/query',
		pathMatch: 'full',
		component: DrinkerComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
