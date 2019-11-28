import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ClientObject} from './../../models/client-object.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  private basePath1 ="http://192.168.56.1:49574/crm-api/clients";

  rejectionOptions : { id:number, value: string }[];
  rejectionReason : string;
  selectedOption:number;
  formClient : FormGroup;
  rating : number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientAddComponent>,
    public dialog: MatDialog,
    private http: HttpClient)
    {
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
      firstLastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      secondLastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      dni: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      rating: ['']
    });
  }

  newHero(formClient) {
      var newProduct = new ClientObject({
         name: formClient.name, lastName : formClient.firstLastName+""+formClient.secondLastName, ci : formClient.dni, 
         address : formClient.address, phone: formClient.phone, ranking: formClient.rating,
       });
       console.log(newProduct);
       const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', })
      };
      return this.http.post<any>(this.basePath1 + 'products', JSON.stringify(newProduct),options);
  }

  get formControls() { return this.formClient.controls; }

  selectedRating(event: any) {
    this.rating = event.value;
    console.log(this.rating);
  }
}
