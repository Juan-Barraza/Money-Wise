import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateForm',
  standalone: false,
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return 'Hoy';
    if (isYesterday) return 'Ayer';

    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      'year': 'numeric'
    })


  }

}
