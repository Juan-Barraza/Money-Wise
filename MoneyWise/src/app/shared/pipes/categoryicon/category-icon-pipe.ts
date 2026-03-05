import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIcon'
})
export class CategoryIconPipe implements PipeTransform {

  private icons: Record<string, string> = {
    'Alimentación': 'fast-food-outline',
    'Transporte': 'car-outline',
    'Vivienda': 'home-outline',
    'Salud': 'medkit-outline',
    'Ocio': 'game-controller-outline',
    'Salario': 'cash-outline',
    'Otros': 'ellipsis-horizontal-outline'
  };

  transform(categoria: string): string {
    return this.icons[categoria] || 'help-outline';
  }

}
