import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ClientObject} from './../../models/client-object.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ClientService } from './../../services/client.service'
import { DialogData } from '../../app.component';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  rejectionOptions : { id:number, value: string }[];
  rejectionReason : string;
  selectedOption:number;
  formClient : FormGroup;
  rating : number;
  clientService : ClientService;
  client : ClientObject;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientEditComponent>,
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.clientService = new ClientService(http);
  }

  ngOnInit() {
    this.client = this.data['client'];
    this.createClientForm();
  }

  createClientForm() {
    this.formClient = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      rating: [this.client.ranking+""]
    });
  }

  updateClient(formClient) {
    var newClient = new ClientObject({
       name: formClient.name, lastName : formClient.lastName, ci : formClient.dni, 
       address : formClient.address, phone: formClient.phone, ranking: formClient.rating
     });
     console.log(newClient);
     this.clientService.editClient(newClient,this.client.clientId).subscribe(response => response);
  }

  selectedRating(event: any) {
    this.rating = event.value;
  }
}
