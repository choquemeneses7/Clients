import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ClientObject} from './../../models/client-object.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ClientService } from './../../services/client.service'

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  rejectionOptions : { id:number, value: string }[];
  rejectionReason : string;
  selectedOption:number;
  formClient : FormGroup;
  rating : number;
  clientService : ClientService;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientAddComponent>,
    public dialog: MatDialog,
    private http: HttpClient)
    {
      this.clientService = new ClientService(http);
    }


  ngOnInit() {
    this.createClientForm();
  }

  openDialog(): void {
    this.dialogRef.close(this.getRejectionOption());
    this.dialogRef.close(true);
  }

  getRejectionOption(){
  this.rejectionOptions.forEach(option => {
    if (option.id == this.selectedOption) {
      this.rejectionReason = option.value; 
    }
  });
  return this.rejectionReason;
  }

  createClientForm() {
    this.formClient = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]+")]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      rating: ['']
    });
  }

  createClient(formClient) {
      var newClient = new ClientObject({
         name: formClient.name, lastName : formClient.lastName, ci : formClient.dni, 
         address : formClient.address, phone: formClient.phone, ranking: formClient.rating
       });
       this.clientService.addNewClient(newClient).subscribe(response => {console.log(response)});
  }

  get formControls() { return this.formClient.controls; }

  selectedRating(event: any) {
    this.rating = event.value;
  }
}
