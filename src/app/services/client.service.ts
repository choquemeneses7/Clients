import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ClientObject } from '../models/client-object.model';
import * as data from './../config.json'

@Injectable()
export class ClientService {
  products : ClientObject[];
  configfile:  any  = (data  as  any).default;
  private basePath : string;
  private resourcePath : string;
  constructor(private http: HttpClient) {
    this.basePath = this.configfile['API_URL']
    this.resourcePath = this.configfile['clientsResource'];
  }

  getClientsByID( id : string) {
    return new Promise((resolve, reject) => {
      return this.http.get<ClientObject[]>(this.basePath+"/"+this.resourcePath+"/"+id).subscribe(
        response => {
          resolve(response)
        },
        error => {
          reject('ERROR en http: ' + error)
        }
      );
    });
  }

  getClients(){
    return new Promise((resolve, reject) => {
      this.http.get<ClientObject[]>(this.basePath+"/"+this.resourcePath).subscribe(
        response => {
          resolve(response)
        },
        error => {
          reject('ERROR en http: ' + error)
        }
      );
    });
  }

  public addNewClient(client:ClientObject){
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', })
      };
      return this.http.post<any>(this.basePath+"/"+this.resourcePath, JSON.stringify(client),options).subscribe(
        response => {
          resolve(response)
        },
        error => {
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
      return this.http.put<any[]>(this.basePath+"/"+this.resourcePath+'/'+id,JSON.stringify(client),options).subscribe(
        response => {
          resolve(response)
        },
        error => {
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
      return this.http.delete<any>(this.basePath+"/"+this.resourcePath+'/'+id,options).subscribe(
        response => {
          resolve(response)
        },
        error => {
          reject('ERROR en http: ' + error)
        }
      );
    });
  }
}