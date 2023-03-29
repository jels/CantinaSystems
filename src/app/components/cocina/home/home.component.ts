import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'estado'];
  //dataSource: MatTableDataSource<UserData>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;

  constructor() {
   
  }

  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
  }

  elem=document.documentElement;

  fullscreen(){
    if(this.elem.requestFullscreen){
      this.elem.requestFullscreen();
    }
  }

  //applyFilter(event: Event) {
  //  const filterValue = (event.target as HTMLInputElement).value;
  //  this.dataSource.filter = filterValue.trim().toLowerCase();
//
  //  if (this.dataSource.paginator) {
  //    this.dataSource.paginator.firstPage();
  //  }
  //}

}