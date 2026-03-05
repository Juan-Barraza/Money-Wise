import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryColor'
})
export class CategoryColorPipe implements PipeTransform {

  private colors: Record<string, string> = {
    'Alimentación': '#FF6B6B',
    'Transporte': '#4ECDC4',
    'Vivienda': '#45B7D1',
    'Salud': '#96CEB4',
    'Ocio': '#FFEAA7',
    'Salario': '#6C5CE7',
    'Otros': '#B2BEC3'
  };

  transform(categoria: string): string {
    return this.colors[categoria] || '#B2BEC3';
  }

}
