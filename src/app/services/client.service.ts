import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ClientObject } from '../models/client-object.model';
import * as data from './../config.json'

@Injectable()
export class ClientService {
  products : ClientObject[];
  configfile:  any  = (data  as  any).default;
  private basePath1 : string
  constructor(private http: HttpClient) {
    this.basePath1 = this.configfile['API_URL']
  }

  getClientsByID( id : string) {
    return new Promise((resolve, reject) => {
      return this.http.get<ClientObject[]>(this.basePath1+ id).subscribe(
        response => {
          console.log('el gabo vino a clases')
          resolve(response)
        },
        error => {
          console.log('hubo un error');
          reject('ERROR en http: ' + error)
        }
      );
    });
  }

  getClients(){
    return new Promise((resolve, reject) => {
      this.http.get<ClientObject[]>(this.basePath1).subscribe(
        response => {
          console.log('el gabo vino a clases')
          resolve(response)
        },
        error => {
          console.log('hubo un error');
          reject('ERROR en http: ' + error)
        }
      );
      // return resolve('me he resuelto positivamente');
      // return reject('me he resuelto mal');
    });
  }

  public addNewClient(client:ClientObject){
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', })
      };
      return this.http.post<any>(this.basePath1, JSON.stringify(client),options).subscribe(
        response => {
          console.log('el gabo vino a clases')
          resolve(response)
        },
        error => {
          console.log('hubo un error');
          reject('ERROR en http: ' + error)
        }
      );
    });
  }

  public editClient(client:ClientObject, id:string){
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', })
      };
      return this.http.put<any[]>(this.basePath1+'/'+id,JSON.stringify(client),options).subscribe(
        response => {
          console.log('el gabo vino a clases')
          resolve(response)
        },
        error => {
          console.log('hubo un error');
          reject('ERROR en http: ' + error)
        }
      );
    });
  }

  public deleteClient(id: string) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', })
      };
      return this.http.delete<any>(this.basePath1+'/'+id,options).subscribe(
        response => {
          console.log('el gabo vino a clases')
          resolve(response)
        },
        error => {
          console.log('hubo un error');
          reject('ERROR en http: ' + error)
        }
      );
    });
  }
}