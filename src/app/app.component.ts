import { Component } from '@angular/core';
import { MatTableDataSource,MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ClientAddComponent} from './client/client-add/client-add.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clients';
  confirmAction: boolean = false;

  constructor(public dialog: MatDialog
  ) { 
  }

  openProductAddDialog():void {
    let dialogRef = this.dialog.open(ClientAddComponent, {
      width: '700px',
      data: {
        confirmAction: this.confirmAction
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
