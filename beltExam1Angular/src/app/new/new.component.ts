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
      if (pet.message === "Error") {
        if(pet.error.errors){
          this.validationError = pet.error.errors;
        }
        else if(pet.error.code === 11000){
          this.validationError = {name:{message:"Name should be unique"}}  // this makes this.validationError a map, too
          // this.validationError.type = {message:"Type in bozuk"}
          // this.validationError["description"] = {message:"Desc in bozuk"}
        }
      }
      else {
       this.router.navigate(['/home']);
      }
    })

  }

}
