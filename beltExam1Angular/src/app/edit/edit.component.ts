import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  thePet: any;
  petID: any;
  validationError: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getThePet(params['id']);
      this.petID = (params['id'])
    });
  }

  getThePet(ID) {
    let observable = this._httpService.getThePet(ID);
    observable.subscribe(data => {
        this.thePet = data['data'];
        console.log("DATA", data)
        console.log(this.thePet)
    })
  };

  updatePet(){
    let observable = this._httpService.editPet(this.petID, this.thePet);
      observable.subscribe(data => {
        console.log("Editing pet!", data);
        let pet = data as any;
        console.log(pet);
        if (pet.message === "Update error") {
          console.log("pet.error var")
          this.validationError = pet.error.errors;
          console.log(this.validationError)
        }
        else {
          this._router.navigate([`/details/${this.petID}`]);
        }
            
      })
  }

}
