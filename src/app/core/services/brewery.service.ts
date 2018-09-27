import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import {Brewery} from '../models/breweries.model';

@Injectable()
export class BreweryService {
  constructor(private http: HttpClient) {}
  getBreweries(): Observable<Brewery[]> {
    return this.http.get('./assets/breweries.json')
      .pipe(
        map(res => {
          if (res instanceof Array) {
            return res.map(brewery => Object.assign(new Brewery(), brewery));
          }
        })
      );
  }
  getBreweryById(breweryId: string): Observable<Brewery[]> {
    return this.http.get('./assets/breweries.json')
      .pipe(
        map(res => {
          if (res instanceof Array) {
            return res.map(brewery => Object.assign(new Brewery(), brewery))
                      .filter(brewery => brewery.id === breweryId); // filters for specific brewery
          }
        })
      );
  }
}
