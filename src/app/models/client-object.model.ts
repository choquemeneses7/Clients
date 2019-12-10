export class ClientObject {
    public name: string;
    public lastName: string;
    public ci: string;
    public address: string;
    public phone: number;
    public ranking: number;
    public clientId: string;
  
    constructor(object: any){
      this.name = (object.name) ? object.name : null;
      this.lastName = (object.lastName) ? object.lastName : null;
      this.ci = (object.ci) ? object.ci : null;
      this.address = (object.address) ? object.address : null;
      this.phone = (object.phone) ? object.phone : null;
      this.ranking = (object.ranking) ? object.ranking : null; 
      this.clientId = (object.clientId) ? object.clientId : null; 
    }
  }