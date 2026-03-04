import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
  standalone: false,
})
export class LoadingButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  constructor() { }

  ngOnInit() { }

}
