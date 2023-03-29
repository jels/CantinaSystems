import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Food {
  idAlmuerzo: string;
  nombrePlato: string;
}
export interface Dias {
  nombredia: string;
  color: string;
  text: string;

}

export interface UserData {
  id: string;
  name: string;
  name2: string;
  progress: string;
  fruit: string;
  fruit2: string;
}

const FRUITS: string[] = [
  'Grille de pollo con enzalada Rusa',
  'Lasaña con Arroz con queso',
  'Grille de pollo con pure de papas',
  'Guiso de Arroz con carne',
  'Grille de carne con pure de papas',
  'Cualquiera',
  'pomegranate',
  'pineapple',
];

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-almuerzos',
  templateUrl: './almuerzos.component.html',
  styleUrls: ['./almuerzos.component.css']
})
export class AlmuerzosComponent implements AfterViewInit {
  selected!: Date | null;
  displayedColumns: string[] = ['id', 'name', 'name2', 'progress', 'fruit', 'fruit2'];
  dataSource: MatTableDataSource<UserData>;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  foods: Food[] = [
    { idAlmuerzo: '123', nombrePlato: 'Grille de pollo con enzalada Rusa' },
    { idAlmuerzo: '321', nombrePlato: 'Lasaña con Arroz con queso' },
    { idAlmuerzo: '456', nombrePlato: 'Grille de pollo con pure de papas' },
    { idAlmuerzo: '654', nombrePlato: 'Milanesa con pure de papas' },
    { idAlmuerzo: '987', nombrePlato: 'Guiso de Arroz con carne' },
    { idAlmuerzo: '458', nombrePlato: 'etc' },
    { idAlmuerzo: '689', nombrePlato: 'Grille de carne con pure de papas' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _formBuilder: FormBuilder) {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    name2: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    fruit2: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}