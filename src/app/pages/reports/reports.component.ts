import { Component, OnInit, signal } from '@angular/core';
import { ReportsResponse } from '../../model/Report.model';
import { ReportService } from '../../services/report.service';
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";
import { TableComponent } from "../../components/table/table.component";
import { Sort } from '@angular/material/sort';
import { SortChange } from '../../components/table/table.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-report',
  imports: [
    SearchbarComponent,
    TableComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  reports = signal<ReportsResponse | undefined>(undefined);
  isLoading = signal(false);

  private _currentSearchTerm = signal("");
  private _currentPage = signal(0);
  private _currentSort: Sort = { active: "timestamp", direction: "desc" };

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.reportService
      .getReports()
      .subscribe({
        next: (reports) => (this.reports.set(reports)),
        complete: () => this.isLoading.set(false),
      });
  }

  sortChange() {
    this.isLoading.set(true);
    this.reportService
      .getReports(this._currentPage(), {
        keyword: this._currentSearchTerm(),
        sortBy: this._currentSort.active,
        sortDirection: this._currentSort.direction,
      })
      .subscribe({
        next: (reports) => this.reports.set(reports),
        complete: () => this.isLoading.set(false),
      });
  }

  handleSearch(searchTerm: string) {
    this._currentSearchTerm.set(searchTerm);
    this.sortChange();
  }

  onSortChange({ sort, page }: SortChange) {
    this._currentSort = sort;
    this._currentPage.set(page);
    this.sortChange();
  }

}
