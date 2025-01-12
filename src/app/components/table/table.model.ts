import { SortDirection } from "@angular/material/sort";

export interface SortChange {
    sort: {
        direction: SortDirection;
        active: string;
    };
    page: number;
}