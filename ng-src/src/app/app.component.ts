import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private http:Http){}

  ngOnInit(){
    this.checkProfile();
  }

  checkProfile(){
    this.http.get("/api/profile").subscribe(data => {
      console.log(data);
    })
  }
}
