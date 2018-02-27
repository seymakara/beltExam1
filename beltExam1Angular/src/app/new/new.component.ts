import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;
  validationError: any;

  constructor(private _httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.newPet = {}
  }

  addPet(){
    console.log("creating")
    let observable = this._httpService.addPet(this.newPet);
    observable.subscribe(data => {
      let pet = data as any;
      console.log(pet);
      if (pet.message === "Error") {
        console.log("pet.error var")
        this.validationError = pet.error.errors;
        console.log("VALIDATIONERROR", this.validationError)
      }
      else {
       this.router.navigate(['/home']);
      }
    })

  }

}
