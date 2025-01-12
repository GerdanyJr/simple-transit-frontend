import { DatePipe } from '@angular/common';
import { AfterViewChecked, Component, input, OnChanges, output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Report } from '../../model/Report.model';
import { merge, Subscription } from 'rxjs';
import { SortChange } from './table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    DatePipe,
    MatSortModule,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewChecked, OnChanges {
  data = input.required<Report[]>();
  totalElements = input.required<number>();
  numberOfElements = input.required<number>();
  isLoading = input<boolean | null>();

  sortChange = output<SortChange>();

  private _elementsInitialized = false;
  private _sortChangeSubscription?: Subscription;
  private _changesSubscription?: Subscription;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnsToDisplay = [
    "id",
    "summary",
    "description",
    "timestamp",
    "address",
    "latitude",
    "longitude",
    "userId",
    "reportTypeId"
  ];

  ngAfterViewChecked(): void {
    if (!this.isLoading() && !this._elementsInitialized && this.sort && this.paginator) {
      this._elementsInitialized = true;

      this._sortChangeSubscription = this
        .sort
        .sortChange
        .subscribe(() => (this.paginator.pageIndex = 0));

      this._changesSubscription = merge(this.sort.sortChange, this.paginator.page)
        .subscribe(() => {
          this.sortChange.emit({
            sort: {
              direction: this.sort.direction,
              active: this.sort.active
            },
            page: this.paginator.pageIndex
          }
          );
        }
        )
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["isLoading"] && this.isLoading()) {
      this._elementsInitialized = false;
      this._changesSubscription?.unsubscribe();
      this._sortChangeSubscription?.unsubscribe();
    }
  }
}
