import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ClientObject } from '../models/client-object.model';

@Injectable()
export class ClientService {
  products : ClientObject[];
  private basePath1 ="";
  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(this.basePath1 + 'products', JSON.stringify(client),options);
  }

  public editClient(client:ClientObject, id:string){
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', })
    };
    return this.http.patch<any[]>(this.basePath1+'products/'+id,JSON.stringify(client),options);
  }
}