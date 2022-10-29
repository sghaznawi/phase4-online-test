import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 login = 0;


  constructor() {
    this.login=parseInt(sessionStorage.getItem('loggedIn'));
    console.log('this.login...',this.login)
   }

  ngOnInit() {
  }

}
