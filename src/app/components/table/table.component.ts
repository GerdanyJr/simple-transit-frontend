import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Report } from '../../types/Report';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    DatePipe,
    MatSortModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  data = input.required<Report[]>();
  isLoading = input<boolean | null>();
  onRowClick = output<Report>();
  onPageClick = output<PageEvent>();
  onSortChange = output<Sort>();
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

  onClick(row: Report) {
    this.onRowClick.emit(row);
  }

  onPage(event: PageEvent) {
    this.onPageClick.emit(event);
  }

}
