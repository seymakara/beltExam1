import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPets(){
    return this._http.get('/pets')
  };

  addPet(newPet){
    console.log("NEWPET:", newPet)
    return this._http.post('/pets', newPet)
  };

  getThePet(thePetID){
    return this._http.get(`/pets/${thePetID}`)
  };

  editPet(thePetID, pet) {
    return this._http.put(`/pets/${thePetID}`, pet)
  };
  
  deletePet(thePetID) {
    return this._http.delete(`/pets/${thePetID}`)
  }

}
