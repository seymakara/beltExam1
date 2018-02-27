import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getPetsFromService()
  };

  getPetsFromService(){
    let observable = this._httpService.getPets();
    observable.subscribe(response=> {
      console.log("Got our data!", response)
      this.pets = response['data'] //response we got from the service is an object. that's why we need to reach data inside this object.
    });
  };



}
