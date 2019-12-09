import { Component,ViewChild } from '@angular/core';
import { MatTableDataSource,MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ClientAddComponent} from './client/client-add/client-add.component';
import {ClientObject} from './models/client-object.model';
import { ClientService } from './services/client.service';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Clients';
  confirmAction: boolean = false;
  clients : ClientObject[];
  clientsLengthBefore : Number;
  pageIndex: number = 0;
  dataSource: any = new MatTableDataSource<ClientObject>();
  displayedColumns: string[];
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  clientSeleted: ClientObject;
  durationInSeconds = 5;

  constructor(
    public dialog: MatDialog,
    private clientService: ClientService,
    private _snackBar: MatSnackBar
  ) { 
  }

  ngOnInit() {
    this.fillTable();
    this.getTitleCol();
  }

  openClientAddDialog():void {
    let dialogRef = this.dialog.open(ClientAddComponent, {
      width: '700px',
      data: {
        confirmAction: this.confirmAction
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fillTable();
    });
  }

  openClientEditDialog(Client : ClientObject):void {
    this.clientSeleted = Client;
    let dialogRef = this.dialog.open(ClientEditComponent, {
      data: {
        client: Client
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fillTable();
    });
  }

  public fillTable() {
    this.clients = [];
    this.clientService.getClients()
      .then(clients => clients => { 
        for (var j = 0; j<clients.length;j++) {
          this.clients.push(clients[j]);
        }
        this.dataSource = new MatTableDataSource<ClientObject>(this.clients);
        if (this.clientsLengthBefore == undefined) {
          this.clientsLengthBefore = this.clients.length;
        }
        else {
          if(this.clientsLengthBefore < this.clients.length){
            this.clientsLengthBefore = this.clients.length
            let maxItemId = Math.max.apply(Math, this.clients.map(function (client) { return client.clientId; }));
            let itemPositionIndex = this.clients.findIndex(client => client.clientId === maxItemId);
            this.pageIndex = Math.trunc(itemPositionIndex / this.paginator.pageSize);
          } else if (this.clientsLengthBefore == this.clients.length) {
            if (this.clientSeleted) {
              let itemPositionIndex = this.clients.findIndex(client => client.clientId === this.clientSeleted.clientId);
              this.pageIndex = Math.trunc(itemPositionIndex / this.paginator.pageSize);
              this.clientSeleted = null;
            } else {
              this.pageIndex = this.paginator.pageIndex;
            }
          } else if (this.clientsLengthBefore > this.clients.length) {
            this.clientsLengthBefore = this.clients.length
            this.pageIndex = 0;
          }

        }
        
        setTimeout(() => {
          this.paginator.pageIndex = this.pageIndex;
          this.dataSource = new MatTableDataSource<ClientObject>(this.clients);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 500);
      })
      .catch(error => {console.log(error);
        this.openSnackBar("❌No Se Pudieron Obtener los Clientes","Cerrar")},
      ); 
  }

  openDeleteClientForm(Client : ClientObject) {
    this.clientService.deleteClient(Client.clientId)
    .then(response => response)
    .catch(error => {console.log(error);
      this.openSnackBar("❌Error al borrar el cliente","Cerrar")});
  }

  getTitleCol() {
    this.displayedColumns = ['name','lastName','ci','address','phone','ranking'];
    this.displayedColumns.push('action');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
