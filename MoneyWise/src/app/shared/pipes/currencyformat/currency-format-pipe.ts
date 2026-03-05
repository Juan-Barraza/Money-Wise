import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: false,
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return '$0';

    return new Intl.NumberFormat('es-Co', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,

    }).format(value);
  }

}
