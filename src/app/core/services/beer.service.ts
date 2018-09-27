import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import {Beer} from '../models/beer.model';

@Injectable()
export class BeerService {
  constructor(private http: HttpClient) {}
  getBeers(): Observable<Beer[]> {
    return this.http.get('./assets/beers.json')
    .pipe(
      map(res => {
        if (res instanceof Array) {
          // sort by id on load
          return res.map(beer => Object.assign(new Beer(), beer))
                    .sort((a, b) => a.id - b.id); //  sorts by beer_id
        }
      })
    );
  }
}
