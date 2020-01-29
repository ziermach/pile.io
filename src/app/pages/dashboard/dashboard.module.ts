import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { API_KEY } from './api-key';
import { AngularImdbClientModule } from 'angular-imdb-client';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormsModule,
    AngularImdbClientModule.forRoot({ apiKey: API_KEY.KEY }),
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
