import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './api/movie.service';
import { Config } from './Model/Config';
import { CommonModule } from '@angular/common';
import { AngularImdbClientComponent } from './angular-imdb-client/angular-imdb-client.component';

@NgModule({
  declarations: [AngularImdbClientComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [AngularImdbClientComponent],
})
export class AngularImdbClientModule {
  constructor (@Optional() @SkipSelf() parentModule: AngularImdbClientModule) {
    if (parentModule) {
      throw new Error(
        'AngularImdbClientModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: AngularImdbClientModule,
      providers: [
        {provide: MovieService, useValue: config },
      ],
    };
  }
}
