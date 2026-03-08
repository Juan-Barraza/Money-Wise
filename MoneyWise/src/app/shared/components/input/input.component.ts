import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() step: string = '0.01';
  @Input() control: FormControl | any;
  public displayValue: string = '';
  constructor() { }

  ngOnInit() { }

  public onInput(event: any) {
    const raw = event.target.value;
    const onlyNumbers = raw.replace(/\D/g, '');
    if (!onlyNumbers) {
      this.displayValue = '';
      this.control.setValue(null);
      return;
    }
    console.log(onlyNumbers);
    const formated = new Intl.NumberFormat('es-CO').format(Number(onlyNumbers))
    console.log("formated: ", formated)
    this.displayValue = formated;

    this.control.setValue(Number(onlyNumbers));
  }
}
