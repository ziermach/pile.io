import { Component } from '@angular/core';
import { MovieService } from 'angular-imdb-client';



@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public search: string;
  public response;
  constructor(private movieService: MovieService) {
  }
  submit() {
    this.movieService.searchMovie({s: this.search}).subscribe();
  }
}
