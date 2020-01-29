import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../config/globals';
import { GetMovieParameters, SearchMovieParameters } from '../Model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { Config } from '../Model/Config';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = API_URL;
  private apiKey: string;

  constructor(private httpClient: HttpClient, @Inject(MovieService) config: Config) {
    this.apiKey = config.apiKey;
  }

  private getHttpParams(params: any, apiKey: string): HttpParams {
    let httpParams = new HttpParams();
    if (this.apiKey) {
      httpParams.set('apiKey', apiKey);
    }

    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.set(key, params[key]);
    });
    return httpParams;
  }
  /**
   * Get Move by ID or Title
   * @param getMoveParams: GetMovieParameters
   */
  public getMovie(getMoveParams: GetMovieParameters): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      this.httpClient.get(this.apiUrl, { params: this.getHttpParams(getMoveParams, this.apiKey) }).subscribe(
        (response: any) => {
          subscriber.next(response)
        },
        (error: Error) => {
          subscriber.error(error);
        }
      );
    })
  }

  /**
 * Get Move by ID or Title
 * @param searchMoveParams: GetMovieParameters
 */
public searchMovie(searchMoveParams: SearchMovieParameters): Observable<any> {

    return new Observable((subscriber: Subscriber<any>) => {
      this.httpClient.get(this.apiUrl, { params: this.getHttpParams(searchMoveParams, this.apiKey) }).subscribe(
        (response: any) => {
          subscriber.next(response)
        },
        (error: Error) => {
          subscriber.error(error);
        }
      );
    })
  }
}
