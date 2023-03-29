import { Component } from '@angular/core';

export interface Food {
  idAlmuerzo: string;
  nombrePlato: string;
}
export interface Dias{
  nombredia: string;
  color: string;
  text: string;

}

@Component({
  selector: 'app-almuerzos',
  templateUrl: './almuerzos.component.html',
  styleUrls: ['./almuerzos.component.css']
})
export class AlmuerzosComponent {

  dias: Dias[] = [
    {nombredia: 'Domingo', color: '#FFFFFF', text: 'red'},
    {nombredia: 'Lunes', color: '#00ff0d', text: 'green'},
    {nombredia: 'Martes', color: '#00ff0d', text: 'green'},
    {nombredia: 'Miércoles', color: '#00ff0d', text: 'green'},
    {nombredia: 'Jueves', color: '#00ff0d', text: 'green'},
    {nombredia: 'Viernes', color: '#00ff0d', text: 'green'},
    {nombredia: 'Sábado', color: '#FFFFFF', text: 'red'},
  ];

  foods: Food[] = [
    {idAlmuerzo: '123', nombrePlato: 'Grille de pollo con enzalada Rusa'},
    {idAlmuerzo: '321', nombrePlato: 'Lasaña con Arroz con queso'},
    {idAlmuerzo: '456', nombrePlato: 'Grille de pollo con pure de papas'},
    {idAlmuerzo: '654', nombrePlato: 'Milanesa con pure de papas'},
    {idAlmuerzo: '987', nombrePlato: 'Guiso de Arroz con carne'},
    {idAlmuerzo: '458', nombrePlato: 'etc'},
    {idAlmuerzo: '689', nombrePlato: 'Grille de carne con pure de papas'},
  ];

}
