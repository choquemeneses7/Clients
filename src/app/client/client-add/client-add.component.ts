import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientAddComponent>,
    public dialog: MatDialog)
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
    console.log(formClient.name);
    console.log(formClient.firstLastName);
    console.log(formClient.secondLastName);
    console.log(formClient.dni);
    console.log(formClient.address);
    console.log(formClient.phone);
    console.log(this.rating);
  }

  get formControls() { return this.formClient.controls; }

  selectedRating(event: any) {
    this.rating = event.value;
    console.log(this.rating);
  }
}
