import { Component, computed, input, output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent {
  label = input.required<string>();
  buttonEnabled = input<boolean>();
  onSearch = output<string>();
  searchTerm = signal("");
  
  disableButton = computed(() => !this.buttonEnabled || this.searchTerm().trim().length === 0);

  onSearchClick() {
    this.onSearch.emit(this.searchTerm());
  }

}
