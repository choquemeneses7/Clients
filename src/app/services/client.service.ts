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
    return this.http.get<ClientObject[]>(this.basePath1+ id);
  }
  getClients (){
    return this.http.get<ClientObject[]>(this.basePath1);
  }

  public addNewClient(client:ClientObject){
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', })
    };
    return this.http.post<any>(this.basePath1, JSON.stringify(client),options);
  }

  public editClient(client:ClientObject, id:string){
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', })
    };
    return this.http.put<any[]>(this.basePath1+'/'+id,JSON.stringify(client),options);
  }

  public deleteClient(id: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', })
    };
    return this.http.delete<any>(this.basePath1+'/'+id,options);
  }
}