import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {BeerService} from './core/services/beer.service';
import {Beer} from './core/models/beer.model';
import {BreweryService} from './core/services/brewery.service';
import {BreweryDialogComponent} from './brewery-dialog/brewery-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'abv', 'cat_name', 'style_name'];
  dataSource: MatTableDataSource<Beer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private beerService: BeerService,
    private breweryService: BreweryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.beerService.getBeers()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  roundAbv(abv: string) {
    return parseFloat(abv).toFixed(2);
  }

  fakeParse(abv: string) {
    if (abv.includes('.')) {
      if (abv.split('.')[1].length > 2) {
        const abvSplit = abv.split('.');
        abvSplit[1] = abvSplit[1].slice(0, 2);
        return abvSplit.join('.');
      }
    }
    return abv;
  }

  openBreweryDialog(beer: Beer): void {
    const dialogRef = this.dialog.open(BreweryDialogComponent, {
      width: '1000px',
      height: '600px',
      data: {beerData: beer}
    });

    dialogRef.afterClosed().subscribe();
  }
}
