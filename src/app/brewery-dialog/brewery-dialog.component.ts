import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {BreweryService} from '../core/services/brewery.service';
import {Brewery} from '../core/models/breweries.model';


@Component({
  selector: 'app-brewery-dialog',
  templateUrl: './brewery-dialog.component.html',
  styleUrls: ['./brewery-dialog.component.css']
})
export class BreweryDialogComponent implements OnInit {
  breweryData: Brewery[];
  constructor(
    private breweryService: BreweryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.breweryService.getBreweryById(this.data.beerData.brewery_id).subscribe(res => {
      this.breweryData = res;
    });
  }

}
