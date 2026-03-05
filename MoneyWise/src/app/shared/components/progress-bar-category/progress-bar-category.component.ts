import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-category',
  templateUrl: './progress-bar-category.component.html',
  styleUrls: ['./progress-bar-category.component.scss'],
  standalone: false,
})
export class ProgressBarCategoryComponent implements OnInit {
  @Input() category: string = '';
  @Input() average: number = 0;
  @Input() color: string = '';
  @Input() amount: number = 0;
  @Input() icon : string = '';
  constructor() { }

  ngOnInit() { }

  get progressValue() {
    return this.average / 100;
  }

}
