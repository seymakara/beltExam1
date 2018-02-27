import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  thePet: any;
  petID: any;
  showlike: any;


  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.getThePet(params['id']);
      this.petID = (params['id'])
    });
    this.showlike = true;
  };

  getThePet(ID) {
    let observable = this._httpService.getThePet(ID);
    observable.subscribe(data => {
        this.thePet = data['data'];
        console.log("DATA", data)
        console.log(this.thePet)
    })
  };

  like() {
    this.showlike = false;
    console.log("hello like")
    this.thePet.likes++;
    this.updatePet();
    // this.showlike = true;

  };

  updatePet(){
    let observable = this._httpService.editPet(this.petID, this.thePet);
    observable.subscribe(data => {
      console.log("Editing pet!", data);
      // this._router.navigate(['/home']);
    })
  };
  deletePet() {
    let observable = this._httpService.deletePet(this.petID);
    observable.subscribe(data => {
        console.log(data);
    })
  };

}
