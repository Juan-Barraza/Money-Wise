import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from 'src/app/core/models/types/category.type'

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: false,
})
export class FilterBarComponent implements OnInit {
  @Input() categories: ICategory[] = [];
  @Output() onTypeChange = new EventEmitter<string>();
  @Output() onCategoryChange = new EventEmitter<number>();
  @Output() onSearchChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  public onType(event: any) {
    this.onTypeChange.emit(event.detail.value);
  }

  public onCategory(event: any) {
    this.onCategoryChange.emit(event.detail.value);
  }

  public onSearch(event: any) {
    this.onSearchChange.emit(event.target.value);
  }
}
