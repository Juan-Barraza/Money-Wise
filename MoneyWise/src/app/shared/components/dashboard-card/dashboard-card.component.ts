import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: false,
})
export class DashboardCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() amount: number = 0;
  @Input() type: 'ingreso' | 'gasto' | 'saldo' = 'saldo';
  @Input() icon: string = '';
  constructor() { }

  ngOnInit() { }

}
