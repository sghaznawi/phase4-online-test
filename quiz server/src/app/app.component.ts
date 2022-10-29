import { Component } from '@angular/core';
import { Router ,ActivatedRoute,NavigationEnd} from '@angular/router';

import { map,mergeMap, filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Test Application';
  constructor(private router:Router,private activatedRoute:ActivatedRoute){}
  visibility:boolean=false;
   ngOnInit(){
  this.router.events.pipe(
  filter(events=>events instanceof NavigationEnd),
  map(evt =>this.activatedRoute),
  map(route => {
  while(route.firstChild) {
  route = route.firstChild;
  }
  return route;
  }))
  .pipe(
  filter(route => route.outlet === 'primary'),
  mergeMap(route => route.data)
  ).subscribe(x=>x.navbar===true ?this.visibility=true:this.visibility=false)
  }}
